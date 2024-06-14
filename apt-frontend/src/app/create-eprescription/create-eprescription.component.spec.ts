import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEprescriptionComponent } from './create-eprescription.component';

describe('CreateEprescriptionComponent', () => {
  let component: CreateEprescriptionComponent;
  let fixture: ComponentFixture<CreateEprescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEprescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEprescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
