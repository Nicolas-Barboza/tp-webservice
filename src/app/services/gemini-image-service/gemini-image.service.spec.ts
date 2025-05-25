import { TestBed } from '@angular/core/testing';
import { GeminiImageService } from './gemini-image.service';

describe('GeminiImageService', () => {
  let service: GeminiImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeminiImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
