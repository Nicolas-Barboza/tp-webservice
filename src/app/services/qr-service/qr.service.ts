import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class QrService {
  constructor(private http: HttpClient) {}

  async generarQrBase64(texto: string): Promise<string> {
    const url = `https://quickchart.io/qr?text=${encodeURIComponent(texto)}&format=png&ecLevel=H`;
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}