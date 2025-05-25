import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Necesario para [(ngModel)]
import { CurrencyConverterService } from '../../services/currency-converter-service/currency-converter.service'; // Ajusta la ruta
import { Currency, ConvertResponse } from '../../models/currency.models'; 

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule], // FormsModule es clave para el binding de dos vías
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.css']
})
export class CurrencyConverterComponent implements OnInit {
  currencies: Currency[] = [];
  
  fromCurrency: string = 'USD'; // Moneda origen por defecto
  toCurrency: string = 'ARS';   // Moneda destino por defecto
  amount: number = 1;           // Cantidad por defecto
  convertedAmount: number | null = null;
  conversionRate: number | null = null;
  lastConversionQuery: { from: string, to: string, amount: number } | null = null;

  isLoadingCurrencies: boolean = true;
  isLoadingConversion: boolean = false;
  errorLoadingCurrencies: string | null = null;
  errorInConversion: string | null = null;

  private currencyService = inject(CurrencyConverterService);

  constructor() {}

  ngOnInit(): void {
    this.loadSupportedCurrencies();
  }

  loadSupportedCurrencies(): void {
    this.isLoadingCurrencies = true;
    this.errorLoadingCurrencies = null;
    this.currencyService.getSupportedCurrencies().subscribe({
      next: (data) => {
        this.currencies = data.sort((a, b) => a.name.localeCompare(b.name)); // Ordenar alfabéticamente
        // Podrías querer preseleccionar monedas comunes si están en la lista
        if (!this.currencies.find(c => c.code === this.fromCurrency) && this.currencies.length > 0) {
          this.fromCurrency = this.currencies[0].code;
        }
        if (!this.currencies.find(c => c.code === this.toCurrency) && this.currencies.length > 1) {
          this.toCurrency = this.currencies[1].code;
        } else if (!this.currencies.find(c => c.code === this.toCurrency) && this.currencies.length > 0) {
          this.toCurrency = this.currencies[0].code;
        }
        this.isLoadingCurrencies = false;
      },
      error: (err) => {
        console.error('Error fetching supported currencies:', err);
        this.errorLoadingCurrencies = 'Error al cargar la lista de monedas.';
        this.isLoadingCurrencies = false;
      }
    });
  }

  convert(): void {
    if (!this.fromCurrency || !this.toCurrency || this.amount === null || this.amount <= 0) {
      this.errorInConversion = 'Por favor, selecciona las monedas y una cantidad válida.';
      this.convertedAmount = null;
      this.conversionRate = null;
      this.lastConversionQuery = null;
      return;
    }

    this.isLoadingConversion = true;
    this.errorInConversion = null;
    this.convertedAmount = null;
    this.conversionRate = null;

    this.currencyService.convertCurrency(this.fromCurrency, this.toCurrency, this.amount).subscribe({
      next: (response: ConvertResponse | null) => {
        if (response && response.success) {
          this.convertedAmount = response.result;
          this.conversionRate = response.info?.quote || null;
          this.lastConversionQuery = response.query || null;
        } else {
          this.errorInConversion = 'No se pudo realizar la conversión. Inténtalo de nuevo.';
          console.warn('Conversion was not successful or response is null:', response);
        }
        this.isLoadingConversion = false;
      },
      error: (err) => {
        console.error('Error during currency conversion:', err);
        this.errorInConversion = 'Ocurrió un error al realizar la conversión.';
        this.isLoadingConversion = false;
      }
    });
  }

  swapCurrencies(): void {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }
}