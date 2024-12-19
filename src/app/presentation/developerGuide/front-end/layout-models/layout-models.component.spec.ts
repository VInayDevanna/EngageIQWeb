import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutModelsComponent } from './layout-models.component';

describe('LayoutModelsComponent', () => {
  let component: LayoutModelsComponent;
  let fixture: ComponentFixture<LayoutModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
