import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EprescriptionListComponent } from './eprescription-list.component';

describe('EprescriptionListComponent', () => {
  let component: EprescriptionListComponent;
  let fixture: ComponentFixture<EprescriptionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EprescriptionListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EprescriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
