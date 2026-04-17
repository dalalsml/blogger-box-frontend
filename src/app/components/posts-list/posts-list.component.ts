import { Component } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { catchError, finalize, Observable, of, startWith, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent {
  private readonly refresh$ = new Subject<void>();
  readonly posts$: Observable<Post[]>;
  loading = true;
  error = '';

  constructor(private postService: PostService) {
    this.posts$ = this.refresh$.pipe(
      startWith(void 0),
      tap(() => {
        this.loading = true;
        this.error = '';
      }),
      switchMap(() =>
        this.postService.getAll().pipe(
          catchError(() => {
            this.error = 'Impossible de charger les posts. Verifie le backend sur http://localhost:8080.';
            return of([]);
          }),
          finalize(() => {
            this.loading = false;
          })
        )
      )
    );
  }

  loadPosts(): void {
    this.refresh$.next();
  }

  trackByPostId(_index: number, post: Post): string {
    return post.id;
  }
}
