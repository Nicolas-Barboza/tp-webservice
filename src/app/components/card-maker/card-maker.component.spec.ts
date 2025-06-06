import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMakerComponent } from './card-maker.component';

describe('CardMakerComponent', () => {
  let component: CardMakerComponent;
  let fixture: ComponentFixture<CardMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
