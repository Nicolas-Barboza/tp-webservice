import { Component, OnInit, TemplateRef, ViewChild, inject } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { CarApiService } from '../../services/car-service/car-api.service';
import { CarMake, CarModel } from '../../models/car.models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'; // Importamos NgbModal y NgbModalRef

@Component({
  selector: 'app-card-maker',
  standalone: true,
  imports: [CommonModule], // NgbModalModule no es necesario aquí si solo inyectamos el servicio y usamos <ng-template>
  templateUrl: './card-maker.component.html',
  styleUrls: ['./card-maker.component.css']
})
export class CardMakerComponent implements OnInit {
  makes: CarMake[] = [];
  models: CarModel[] = [];
  selectedMake: CarMake | null = null;
  isLoadingMakes: boolean = true;
  isLoadingModels: boolean = false;
  errorMakes: string | null = null;
  errorModels: string | null = null;

  // Referencia al <ng-template> que definiremos en el HTML para el contenido del modal
  @ViewChild('modelsModalContent') modelsModalContent?: TemplateRef<any>;
  private activeModal: NgbModalRef | undefined;

  // Forma moderna de inyectar NgbModal en componentes standalone
  private modalService = inject(NgbModal);

  constructor(private carApiService: CarApiService) {}

  ngOnInit(): void {
    this.loadMakes();
  }

  loadMakes(): void {
    this.isLoadingMakes = true;
    this.errorMakes = null;
    this.carApiService.getMakes().subscribe({
      next: (data) => {
        this.makes = data;
        this.isLoadingMakes = false;
      },
      error: (err) => {
        console.error('Error fetching makes:', err);
        this.errorMakes = 'Error al cargar las marcas.';
        this.isLoadingMakes = false;
      }
    });
  }

  onMakeSelected(make: CarMake): void {
    this.selectedMake = make;
    this.models = [];
    this.isLoadingModels = true;
    this.errorModels = null;
    const yearToFetch = 2020; 

    this.carApiService.getModelsByMake(make.id, yearToFetch).subscribe({
      next: (data) => {
        this.models = data;
        this.isLoadingModels = false;
        if (this.modelsModalContent) { // Solo abre el modal si la plantilla existe
          this.openModelsModal(this.modelsModalContent);
        } else {
          console.error('Modal content template not found!');
        }
      },
      error: (err) => {
        console.error(`Error fetching models for ${make.name}:`, err);
        this.errorModels = `Error al cargar los modelos para ${make.name}.`;
        this.isLoadingModels = false;
      }
    });
  }

  // Método para abrir el modal usando NgbModal
  openModelsModal(content: TemplateRef<any>): void {
    this.activeModal = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg' });
    this.activeModal.result.then(
      (result) => {
        console.log(`Modal cerrado con: ${result}`);
      },
      (reason) => {
        console.log(`Modal descartado: ${reason}`);
      }
    );
  }
}