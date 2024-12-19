import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackEndBasicsComponent } from './back-end-basics.component';

describe('BackEndBasicsComponent', () => {
  let component: BackEndBasicsComponent;
  let fixture: ComponentFixture<BackEndBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackEndBasicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackEndBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
