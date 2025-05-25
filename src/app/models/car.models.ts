export interface CarMake {
    id: number;
    name: string;
  }
  
  export interface CarModel {
    id: number;
    make_id: number; // El ID de la marca a la que pertenece
    name: string;    // Nombre del modelo
  }
  
  // Para la respuesta del endpoint que lista todas las marcas 
  export interface CarMakesApiResponse {
    data: CarMake[];
  }
  
  // Para la respuesta del endpoint que lista los modelos 
  export interface CarModelsApiResponse {
    data: CarModel[];
  }