import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AIBasicsComponent } from './aibasics.component';

describe('AIBasicsComponent', () => {
  let component: AIBasicsComponent;
  let fixture: ComponentFixture<AIBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AIBasicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AIBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
