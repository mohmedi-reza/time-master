export interface Tag {
  id: string;
  name: string;
  category: string;
  color: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface TagColor {
  name: string;
  label: string;
}

export interface TagFormData {
  name: string;
  category: string;
  color: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
} 