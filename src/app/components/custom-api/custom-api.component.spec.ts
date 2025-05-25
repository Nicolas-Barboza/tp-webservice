import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomApiComponent } from './custom-api.component';

describe('CustomApiComponent', () => {
  let component: CustomApiComponent;
  let fixture: ComponentFixture<CustomApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomApiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
