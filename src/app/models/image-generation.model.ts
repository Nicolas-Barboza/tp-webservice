export interface GeminiImageResult {
  imageUrl: string;
  text: string;
}

export interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
} 