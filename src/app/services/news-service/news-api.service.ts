import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewsArticle, NewsDataIoResponse, NewsDataItemFromApi } from '../../models/news.models'; 

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private apiKey = 'pub_48baf1f282b242b4ad95cbe3d7414c32'; 
  private apiUrl = 'https://newsdata.io/api/1/news'; 

  constructor(private http: HttpClient) {}
  
  getNews(query: string, language: string = 'es', country: string = 'ar'): Observable<NewsArticle[]> {
    const params = {
      apikey: this.apiKey,
      q: query,
      language: language,
      country: country, 
    };

    // Usamos NewsDataIoResponse para tipar la respuesta completa de la API
    return this.http.get<NewsDataIoResponse>(this.apiUrl, { params }).pipe(
      map(response => {
        if (response && response.status === 'success' && response.results) {
          return response.results
            // Filtra solo los artículos que tengan los campos que necesitas
            .filter((item: NewsDataItemFromApi) => item.image_url && item.title && (item.description || item.content) && item.link)
            .map((item: NewsDataItemFromApi): NewsArticle => ({
              title: item.title,
              link: item.link,
              // Decide si usas item.description o item.content o una combinación
              description: item.description || (item.content ? item.content.substring(0, 200) + '...' : 'No description available.'),
              imageUrl: item.image_url || undefined // Asigna undefined si no hay image_url
            }));
        }
        console.warn('Newsdata.io response status not "success" or results missing:', response);
        return []; // Devuelve un array vacío si no hay resultados o hay error
      })
    );
  }
}