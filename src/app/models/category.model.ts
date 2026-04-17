export interface Category {
  id: string;
  name: string;
  description?: string;
}

export type CategoryCreateInput = Omit<Category, 'id'>;
export type CategoryUpdateInput = Omit<Category, 'id'>;

export type CategoryPatchInput = Partial<CategoryUpdateInput>;

export type CategoryCreateInputWithIsActive = CategoryCreateInput & {
  isActive: boolean;
};
