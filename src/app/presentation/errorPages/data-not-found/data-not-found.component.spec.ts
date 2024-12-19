import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataNotFoundComponent } from './data-not-found.component';

describe('DataNotFoundComponent', () => {
  let component: DataNotFoundComponent;
  let fixture: ComponentFixture<DataNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataNotFoundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
