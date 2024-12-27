import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeammappingconfigComponent } from './teammappingconfig.component';

describe('TeammappingconfigComponent', () => {
  let component: TeammappingconfigComponent;
  let fixture: ComponentFixture<TeammappingconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeammappingconfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeammappingconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
