import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { Currency, CurrencyListResponse, ConvertResponse } from '../../models/currency.models'; 

@Injectable({
  providedIn: 'root'
})
export class CurrencyConverterService {
  private apiKey = 'q9wQORegaDwGTrMyKRRrT9fkk5cXqPLr'; 
  private baseUrl = 'https://api.apilayer.com/currency_data';
  private timeoutDuration = 10000; // 10 segundos de timeout

  private commonHeaders = new HttpHeaders().set('apikey', this.apiKey);

  constructor(private http: HttpClient) { }

  // Método para obtener la lista de monedas soportadas
  getSupportedCurrencies(): Observable<Currency[]> {
    const endpoint = `${this.baseUrl}/list`;
    console.log('Fetching currencies from:', endpoint);

    return this.http.get<CurrencyListResponse>(endpoint, { headers: this.commonHeaders }).pipe(
      timeout(this.timeoutDuration),
      map(response => {
        console.log('Currency list response:', response);
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
      catchError(error => {
        console.error('Error fetching currencies:', error);
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('La solicitud ha excedido el tiempo de espera. Por favor, intente nuevamente.'));
        }
        return throwError(() => new Error('Error al cargar la lista de monedas. Por favor, intente nuevamente.'));
      })
    );
  }

  // Método para convertir una cantidad de una moneda a otra
  convertCurrency(from: string, to: string, amount: number): Observable<ConvertResponse | null> {
    const endpoint = `${this.baseUrl}/convert`;
    let params = new HttpParams()
      .set('from', from)
      .set('to', to)
      .set('amount', amount.toString());

    console.log('Converting currency:', { from, to, amount });

    return this.http.get<ConvertResponse>(endpoint, { headers: this.commonHeaders, params: params }).pipe(
      timeout(this.timeoutDuration),
      map(response => {
        console.log('Conversion response:', response);
        if (response && response.success) {
          return response;
        }
        // Si success no es true, o no hay response, podrías querer manejarlo más específicamente.
        console.warn('convertCurrency - API response not successful:', response);
        return null; // O lanzar un error, o devolver un objeto ConvertResponse con success: false
      }),
      catchError(error => {
        console.error('Error during conversion:', error);
        if (error.name === 'TimeoutError') {
          return throwError(() => new Error('La solicitud de conversión ha excedido el tiempo de espera. Por favor, intente nuevamente.'));
        }
        if (error.status === 401) {
          return throwError(() => new Error('Error de autenticación con la API. Por favor, contacte al administrador.'));
        }
        if (error.status === 429) {
          return throwError(() => new Error('Se ha excedido el límite de solicitudes. Por favor, intente más tarde.'));
        }
        return throwError(() => new Error('Error al realizar la conversión. Por favor, intente nuevamente.'));
      })
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