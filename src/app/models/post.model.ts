import { Category } from './category.model';

export interface Post {
  id: string;
  title: string;
  content: string;
  categoryId?: string;
  createdDate?: string;
  category?: Category;
}
