import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleconfigComponent } from './roleconfig.component';

describe('RoleconfigComponent', () => {
  let component: RoleconfigComponent;
  let fixture: ComponentFixture<RoleconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleconfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
