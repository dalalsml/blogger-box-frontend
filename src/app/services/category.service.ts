import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Category,
  CategoryCreateInput,
  CategoryPatchInput,
  CategoryUpdateInput
} from '../models/category.model';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly baseUrl = `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.baseUrl)
      .pipe(catchError((error) => this.handleError(error, 'get categories')));
  }

  getById(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error, 'get category by id')));
  }

  searchByName(name: string): Observable<Category[]> {
    const params = new HttpParams().set('name', name);
    return this.http
      .get<Category[]>(this.baseUrl, { params })
      .pipe(catchError((error) => this.handleError(error, 'search categories by name')));
  }

  getPosts(id: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.baseUrl}/${id}/posts`)
      .pipe(catchError((error) => this.handleError(error, 'get posts for category')));
  }

  create(payload: CategoryCreateInput): Observable<Category> {
    return this.http
      .post<Category>(this.baseUrl, payload)
      .pipe(catchError((error) => this.handleError(error, 'create category')));
  }

  update(id: string, payload: CategoryUpdateInput): Observable<Category> {
    return this.http
      .put<Category>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((error) => this.handleError(error, 'update category')));
  }

  patch(id: string, payload: CategoryPatchInput): Observable<Category> {
    return this.http
      .patch<Category>(`${this.baseUrl}/${id}`, payload)
      .pipe(catchError((error) => this.handleError(error, 'patch category')));
  }

  delete(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError((error) => this.handleError(error, 'delete category')));
  }

  private handleError(error: HttpErrorResponse, operation: string) {
    const message =
      error.error?.message ??
      error.message ??
      `Request failed while trying to ${operation}.`;

    return throwError(() => new Error(message));
  }
}
