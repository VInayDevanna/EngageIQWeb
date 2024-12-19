import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IkigaiTeamsComponent } from './ikigai-teams.component';

describe('IkigaiTeamsComponent', () => {
  let component: IkigaiTeamsComponent;
  let fixture: ComponentFixture<IkigaiTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IkigaiTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IkigaiTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
