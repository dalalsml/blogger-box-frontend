import { Category } from './category.model';

export interface Post {
  id: string;
  title: string;
  content: string;
  categoryId?: string;
  createdDate?: string;
  category?: Category;
}

export type PostCreateInput = Omit<Post, 'id' | 'createdDate' | 'category'>;
export type PostUpdateInput = Omit<Post, 'id' | 'createdDate' | 'category'>;

export type PostPatchInput = Partial<PostUpdateInput>;

export type PostWithUiState = Post & {
  isExpanded: boolean;
};
