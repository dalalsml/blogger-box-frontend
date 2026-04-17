import { Category } from './category.model';

export interface Post {
  id: string;
  title: string;
  content: string;
  categoryId?: string;
  createdDate?: string;
  category?: Category;
}

export interface PostCreateInput {
  title: string;
  content: string;
  categoryId?: string;
}

export interface PostUpdateInput {
  title: string;
  content: string;
  categoryId?: string;
}

export type PostPatchInput = Partial<PostUpdateInput>;
