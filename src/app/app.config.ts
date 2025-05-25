import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes'; 
import { provideHttpClient } from '@angular/common/http'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Aquí se proveen las rutas
    provideHttpClient() // Para hacer peticiones HTTP 
  ]
};