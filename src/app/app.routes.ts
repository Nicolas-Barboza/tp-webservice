import { Routes } from '@angular/router';
import { NewsPortalComponent } from './components/news-portal/news-portal.component';
import { CardMakerComponent } from './components/card-maker/card-maker.component';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { ImageGeneratorComponent } from './components/image-generator/image-generator.component';
import { CustomApiComponent } from './components/custom-api/custom-api.component';

export const routes: Routes = [
  { path: '', redirectTo: 'noticias', pathMatch: 'full' }, 
  { path: 'noticias', component: NewsPortalComponent },
  { path: 'card-maker', component: CardMakerComponent },
  { path: 'conversor', component: CurrencyConverterComponent },
  { path: 'generador-imagen', component: ImageGeneratorComponent },
  { path: 'custom-api', component: CustomApiComponent },
];