import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsPortalComponent } from './news-portal.component';

describe('NewsPortalComponent', () => {
  let component: NewsPortalComponent;
  let fixture: ComponentFixture<NewsPortalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPortalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
