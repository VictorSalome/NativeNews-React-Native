export interface ICategory {
  id: string;
  name: string;
}

export interface ICategoryFilterProps {
  categories: ICategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}
