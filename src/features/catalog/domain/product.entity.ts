export interface CategoryEntity {
  id: string;
  name: string;
  slug: string;
  description: string | null;
}

export interface ProductEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  sizes: string[];
  colors: string[];
  stock: number;
  featured: boolean;
  categoryId: string;
  category?: CategoryEntity;
}

export interface ProductFilters {
  categorySlug?: string;
  search?: string;
  maxPrice?: number;
}
