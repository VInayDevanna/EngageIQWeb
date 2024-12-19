import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrerequisitesComponent } from './prerequisites.component';

describe('PrerequisitesComponent', () => {
  let component: PrerequisitesComponent;
  let fixture: ComponentFixture<PrerequisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrerequisitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrerequisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
