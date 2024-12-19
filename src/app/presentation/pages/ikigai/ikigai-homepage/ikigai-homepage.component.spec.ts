import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IkigaiHomepageComponent } from './ikigai-homepage.component';

describe('IkigaiHomepageComponent', () => {
  let component: IkigaiHomepageComponent;
  let fixture: ComponentFixture<IkigaiHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IkigaiHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IkigaiHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
