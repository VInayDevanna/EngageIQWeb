import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneToOneConnectTeamsComponent } from './one-to-one-connect-teams.component';

describe('OneToOneConnectTeamsComponent', () => {
  let component: OneToOneConnectTeamsComponent;
  let fixture: ComponentFixture<OneToOneConnectTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneToOneConnectTeamsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneToOneConnectTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
