import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneToOneConnectHomePageComponent } from './one-to-one-connect-home-page.component';

describe('OneToOneConnectHomePageComponent', () => {
  let component: OneToOneConnectHomePageComponent;
  let fixture: ComponentFixture<OneToOneConnectHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneToOneConnectHomePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneToOneConnectHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
