import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneToOneConnectIndividualComponent } from './one-to-one-connect-individual.component';

describe('OneToOneConnectIndividualComponent', () => {
  let component: OneToOneConnectIndividualComponent;
  let fixture: ComponentFixture<OneToOneConnectIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneToOneConnectIndividualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneToOneConnectIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
