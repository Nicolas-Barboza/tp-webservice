import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CarMake, CarModel, CarMakesApiResponse, CarModelsApiResponse } from '../../models/car.models'; // Ajusta la ruta si es necesario

@Injectable({
  providedIn: 'root'
})
export class CarApiService {
  private apiKey = '8ccdf37ec9mshf357a9c5f2bd84cp1e0c98jsn8043700e65d0'; 
  private apiHost = 'car-api2.p.rapidapi.com'; 
  private baseUrl = `https://${this.apiHost}/api`;

  private commonHeaders = new HttpHeaders()
    .set('x-rapidapi-key', this.apiKey)
    .set('x-rapidapi-host', this.apiHost);

  constructor(private http: HttpClient) { }

  // Método para obtener todas las marcas
  getMakes(): Observable<CarMake[]> {
    const endpoint = `${this.baseUrl}/makes`; // Endpoint para obtener marcas
    return this.http.get<CarMakesApiResponse>(endpoint, { headers: this.commonHeaders }).pipe(
      map(response => {
        if (response && response.data) {
          return response.data; // Devuelve el array de CarMake
        }
        console.warn('getMakes - API response missing data or malformed:', response);
        return []; // Devuelve array vacío en caso de problemas
      }),
      catchError(this.handleError<CarMake[]>('getMakes', []))
    );
  }

  // Método para obtener los modelos de una marca específica
  // Permite filtrar modelos por 'make_id'. 
  getModelsByMake(makeId: number, year?: number): Observable<CarModel[]> {
    const endpoint = `${this.baseUrl}/models`; // Endpoint para obtener modelos
    let params = new HttpParams()
      .set('make_id', makeId.toString()); 

    if (year) {
      params = params.set('year', year.toString());
    }
    return this.http.get<CarModelsApiResponse>(endpoint, { headers: this.commonHeaders, params: params }).pipe(
      map(response => {
        if (response && response.data) {
          return response.data; // Devuelve el array de CarModel
        }
        console.warn('getModelsByMake - API response missing data or malformed:', response);
        return []; // Devuelve array vacío
      }),
      catchError(this.handleError<CarModel[]>('getModelsByMake', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error.message || error);
      return of(result as T);
    };
  }
}