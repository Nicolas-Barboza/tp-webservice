import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrService } from '../../services/qr-service/qr.service';

@Component({
  selector: 'app-custom-api',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-api.component.html',
  styleUrls: ['./custom-api.component.css']
})
export class CustomApiComponent {
  texto: string = '';
  imagenBase64: string | null = null;

  constructor(private qrService: QrService) {}

  async generarQR() {
    if (this.texto.trim()) {
      this.imagenBase64 = await this.qrService.generarQrBase64(this.texto);
    }
  }
}