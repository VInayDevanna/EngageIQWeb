import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkinProgreessComponent } from './workin-progreess.component';

describe('WorkinProgreessComponent', () => {
  let component: WorkinProgreessComponent;
  let fixture: ComponentFixture<WorkinProgreessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkinProgreessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkinProgreessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
