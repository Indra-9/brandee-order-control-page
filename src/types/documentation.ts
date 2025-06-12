
export interface Documentation {
  id?: string;
  title: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  excerpt?: string;
  content?: string;
  featured_image_url?: string;
  category: string;
  tags: string[];
  author: string;
  featured: boolean;
  published: boolean;
  seo_keywords?: string;
  canonical_url?: string;
  reading_time?: number;
  views_count: number;
  sort_order?: number;
  parent_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
