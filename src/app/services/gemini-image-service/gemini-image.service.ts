import { Injectable } from '@angular/core';
import { GoogleGenAI, Modality } from '@google/genai';

@Injectable({
  providedIn: 'root',
})
export class GeminiImageService {
  private readonly apiKey = 'AIzaSyBS4nOvEpLRfYRowOsPJXPVSDagQa5YtoI';
  private ai = new GoogleGenAI({ apiKey: this.apiKey });

  async generateImageFromPrompt(prompt: string): Promise<string | null> {
    const response = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    const parts = response?.candidates?.[0]?.content?.parts;
    if (!parts) return null;

    for (const part of parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    return null;
  }
}
