import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitechtureGuideComponent } from './architechture-guide.component';

describe('ArchitechtureGuideComponent', () => {
  let component: ArchitechtureGuideComponent;
  let fixture: ComponentFixture<ArchitechtureGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchitechtureGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchitechtureGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
