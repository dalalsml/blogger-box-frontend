import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Post, PostCreateInput, PostPatchInput, PostUpdateInput } from '../models/post.model';

type PostsResponse = Post[] | { content?: Post[]; posts?: Post[]; data?: Post[] };

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly baseUrl = `${environment.apiBaseUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Post[]> {
    return this.http.get<PostsResponse>(this.baseUrl).pipe(
      map((response) => this.normalizePostsResponse(response)),
      map((posts) => posts.map((post) => this.normalizePost(post)))
    );
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

  private normalizePostsResponse(response: PostsResponse): Post[] {
    if (Array.isArray(response)) {
      return response;
    }
    if (Array.isArray(response?.content)) {
      return response.content;
    }
    if (Array.isArray(response?.posts)) {
      return response.posts;
    }
    if (Array.isArray(response?.data)) {
      return response.data;
    }
    return [];
  }

  private normalizePost(post: Post): Post {
    return {
      ...post,
      title: this.fixEncoding(post?.title),
      content: this.fixEncoding(post?.content),
      createdDate: this.normalizeDate(post?.createdDate),
      category: post?.category
        ? {
            ...post.category,
            name: this.fixEncoding(post.category.name)
          }
        : post?.category
    };
  }

  private normalizeDate(value?: string): string | undefined {
    if (!value) {
      return value;
    }

    const matched = value.match(/^(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})$/);
    if (!matched) {
      return value;
    }

    const [, day, month, year, hour, minute, second] = matched;
    return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
  }

  private fixEncoding(value?: string): string {
    if (!value || !/[ÃÂâ€™â€œâ€\uFFFD]/.test(value)) {
      return value || '';
    }

    try {
      return decodeURIComponent(escape(value));
    } catch {
      return value;
    }
  }
}
