import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  errorMessage = '';
  successMessage = '';

  readonly addPostForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(150)]],
    categoryId: ['', [Validators.required]],
    content: ['', [Validators.required, Validators.maxLength(2500)]]
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
    this.successMessage = '';
    this.errorMessage = '';

    if (this.addPostForm.invalid) {
      this.addPostForm.markAllAsTouched();
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
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Post cree avec succes.';
        this.addPostForm.reset({ title: '', categoryId: '', content: '' });
        this.submitted = false;
        this.router.navigate(['/']);
      },
      error: (error: Error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'Echec de creation du post.';
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
      error: (error: Error) => {
        this.errorMessage = error.message || 'Impossible de charger les categories.';
        this.isLoadingCategories = false;
      }
    });
  }
}
