export interface NewsArticle {
  title: string;
  link: string;
  description: string; 
  imageUrl?: string; 
}

export interface NewsDataItemFromApi {
  title: string;
  link: string;
  description?: string;
  content?: string;
  image_url?: string;
  pubDate?: string;
  source_id?: string;
}

export interface NewsDataIoResponse {
  status: string;
  totalResults: number;
  results: NewsDataItemFromApi[];
  nextPage?: string;
}