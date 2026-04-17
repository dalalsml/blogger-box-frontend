import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post, PostCreateInput, PostPatchInput, PostUpdateInput } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = `${environment.apiBaseUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  searchByValue(value: string): Observable<Post[]> {
    const params = new HttpParams().set('value', value);
    return this.http.get<Post[]>(this.baseUrl, { params });
  }

  filterByDate(date: string): Observable<Post[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<Post[]>(this.baseUrl, { params });
  }

  create(payload: PostCreateInput): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, payload);
  }

  update(id: string, payload: PostUpdateInput): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/${id}`, payload);
  }

  patch(id: string, payload: PostPatchInput): Observable<Post> {
    return this.http.patch<Post>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
