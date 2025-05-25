import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Currency, CurrencyListResponse, ConvertResponse } from '../../models/currency.models'; 

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  private apiKey = 'q9wQORegaDwGTrMyKRRrT9fkk5cXqPLr'; 
  private baseUrl = 'https://api.apilayer.com/currency_data';

  private commonHeaders = new HttpHeaders().set('apikey', this.apiKey);

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de monedas soportadas
  getSupportedCurrencies(): Observable<Currency[]> {
    const endpoint = `${this.baseUrl}/list`;

    return this.http.get<CurrencyListResponse>(endpoint, { headers: this.commonHeaders }).pipe(
      map(response => {
        if (response && response.success && response.currencies) {
          // Transformar el objeto de monedas en un array de objetos Currency
          return Object.keys(response.currencies).map(code => ({
            code: code,
            name: response.currencies[code]
          }));
        }
        console.warn('getSupportedCurrencies - API response not successful or currencies missing:', response);
        return []; // Devuelve array vacío en caso de problemas
      }),
      catchError(this.handleError<Currency[]>('getSupportedCurrencies', []))
    );
  }

  // Método para convertir una cantidad de una moneda a otra
  convertCurrency(from: string, to: string, amount: number): Observable<ConvertResponse | null> {
    const endpoint = `${this.baseUrl}/convert`;
    let params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('amount', amount.toString());

    return this.http.get<ConvertResponse>(endpoint, { headers: this.commonHeaders, params: params }).pipe(
      map(response => {
        if (response && response.success) {
          return response;
        }
        // Si success no es true, o no hay response, podrías querer manejarlo más específicamente.
        console.warn('convertCurrency - API response not successful:', response);
        return null; // O lanzar un error, o devolver un objeto ConvertResponse con success: false
      }),
      catchError(this.handleError<ConvertResponse | null>('convertCurrency', null))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error.message || error);
      if (error.error && typeof error.error === 'object') {
        console.error('Error details:', error.error);
      }
      // Devolver el resultado por defecto para que la app siga funcionando 
      return of(result as T);
    };
  }
}