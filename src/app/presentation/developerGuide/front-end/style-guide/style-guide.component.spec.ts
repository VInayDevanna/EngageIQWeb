import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleGuideComponent } from './style-guide.component';

describe('StyleGuideComponent', () => {
  let component: StyleGuideComponent;
  let fixture: ComponentFixture<StyleGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StyleGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StyleGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
