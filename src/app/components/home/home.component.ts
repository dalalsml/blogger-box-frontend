import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { CategoryService } from '../../services/category.service';
import { Post } from '../../models/post.model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];
  categories: Category[] = [];
  loading = true;
  error = '';

  constructor(
    private postService: PostService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.error = '';

    this.postService.getAll().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.categoryService.getAll().subscribe({
          next: (categories) => {
            this.categories = categories;
            this.loading = false;
          },
          error: () => {
            this.error = 'Impossible de charger les categories.';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'Impossible de charger les posts. Verifie le backend sur http://localhost:8080.';
        this.loading = false;
      }
    });
  }
}
