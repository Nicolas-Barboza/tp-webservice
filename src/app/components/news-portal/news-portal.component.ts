import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-service/news-api.service'; 
import { CommonModule } from '@angular/common';
import { NewsArticle } from '../../models/news.models';

@Component({
  selector: 'app-news-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-portal.component.html',
  styleUrls: ['./news-portal.component.css']
})
export class NewsPortalComponent implements OnInit {
  newsArticles: NewsArticle[] = [];
  isLoading: boolean = true;
  errorOccurred: boolean = false;
  errorMessage: string = '';

  constructor(private newsApiService: NewsApiService) {
    console.log('NewsPortalComponent inicializado');
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.loadNews();
  }

  loadNews(): void {
    this.isLoading = true;
    this.errorOccurred = false;
    this.errorMessage = '';
  
    const query = 'noticias';
    const language = 'es';
    this.newsApiService.getNews(query, language).subscribe({
      next: (articles: NewsArticle[]) => {
        this.newsArticles = articles;
        this.isLoading = false;
        if (articles.length === 0) {
          this.errorMessage = 'No se encontraron noticias. Por favor, intenta nuevamente.';
        }
      },
      error: (error: any) => {
        this.isLoading = false;
        this.errorOccurred = true;
        this.errorMessage = 'Error al cargar las noticias. Por favor, intenta nuevamente.';
      }
    });
  }

  removeArticle(article: NewsArticle) {
    this.newsArticles = this.newsArticles.filter(a => a !== article);
  }
}