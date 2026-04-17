export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CategoryCreateInput {
  name: string;
  description?: string;
}

export interface CategoryUpdateInput {
  name: string;
  description?: string;
}

export type CategoryPatchInput = Partial<CategoryUpdateInput>;
