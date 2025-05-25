export interface Currency {
    code: string;    // ej: "USD"
    name: string;    // ej: "United States Dollar"
  }
  
  export interface CurrencyListResponse {
    success: boolean;
    currencies: { [key: string]: string }; // Un objeto donde la clave es el código y el valor es el nombre
  }
  
  // Para la respuesta del endpoint /live 
  export interface LiveRatesResponse {
    success: boolean;
    timestamp?: number;
    source?: string;
    quotes: { [key: string]: number };
  }
  
  // Para la respuesta del endpoint /convert 
  export interface ConvertResponse {
    success: boolean;
    query?: {
      from: string;
      to: string;
      amount: number;
    };
    info?: {
      timestamp: number;
      quote: number; 
    };
    result: number; // El monto convertido
  }