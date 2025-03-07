import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IkigaiconfigComponent } from './ikigaiconfig.component';

describe('IkigaiconfigComponent', () => {
  let component: IkigaiconfigComponent;
  let fixture: ComponentFixture<IkigaiconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IkigaiconfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IkigaiconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
