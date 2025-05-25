import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiImageService } from '../../services/gemini-image-service/gemini-image.service';

@Component({
  selector: 'app-image-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.css']
})
export class ImageGeneratorComponent {
  postTitle: string = '';
  postContent: string = '';
  generatedImageUrl: string | null = null;
  generatedText: string | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private geminiService: GeminiImageService) {}

  async generateImage() {
    if (!this.postTitle.trim()) {
      this.error = 'Por favor, ingresa un título para el post.';
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.generatedImageUrl = null;
    this.generatedText = null;

    try {
      const result = await this.geminiService.generateImageFromPrompt(this.postTitle);
      if (result) {
        this.generatedImageUrl = result;
        this.generatedText = 'Imagen generada exitosamente';
      } else {
        this.error = 'No se pudo generar la imagen.';
      }
    } catch (err) {
      this.error = 'Error al generar la imagen. Intentalo de nuevo.';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }
}
