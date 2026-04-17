import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Category } from '../../models/category.model';
import { PostCreateInput } from '../../models/post.model';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  categories: Category[] = [];
  submitted = false;
  isSubmitting = false;
  isLoadingCategories = false;

  readonly addPostForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    categoryId: ['', [Validators.required]],
    content: ['', [Validators.required, Validators.maxLength(2500)]]
  });

  private readonly toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2200,
    timerProgressBar: true
  });

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  get title(): AbstractControl | null {
    return this.addPostForm.get('title');
  }

  get categoryId(): AbstractControl | null {
    return this.addPostForm.get('categoryId');
  }

  get content(): AbstractControl | null {
    return this.addPostForm.get('content');
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.addPostForm.invalid) {
      this.addPostForm.markAllAsTouched();
      this.toast.fire({
        icon: 'warning',
        title: 'Please review your post'
      });
      return;
    }

    const formValue = this.addPostForm.getRawValue();
    const payload: PostCreateInput = {
      title: formValue.title?.trim() || '',
      categoryId: formValue.categoryId || undefined,
      content: formValue.content?.trim() || ''
    };

    this.isSubmitting = true;

    this.postService.create(payload).subscribe({
      next: async () => {
        this.isSubmitting = false;
        this.addPostForm.reset({ title: '', categoryId: '', content: '' });
        this.submitted = false;

        await this.toast.fire({
          icon: 'success',
          title: 'Post Submitted Successfully'
        });

        this.router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        this.isSubmitting = false;
        this.toast.fire({
          icon: 'error',
          title: this.getErrorMessage(error, 'Post submission failed')
        });
      }
    });
  }

  private loadCategories(): void {
    this.isLoadingCategories = true;
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoadingCategories = false;
      },
      error: (error: HttpErrorResponse) => {
        this.isLoadingCategories = false;
        this.toast.fire({
          icon: 'error',
          title: this.getErrorMessage(error, 'Unable to load categories')
        });
      }
    });
  }

  private getErrorMessage(error: HttpErrorResponse, fallback: string): string {
    if (typeof error?.error === 'string' && error.error.trim()) {
      return error.error;
    }
    if (error?.error?.message) {
      return error.error.message;
    }
    if (error?.message) {
      return error.message;
    }
    return fallback;
  }
}
