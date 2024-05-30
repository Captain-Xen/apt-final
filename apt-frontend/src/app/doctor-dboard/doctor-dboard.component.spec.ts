import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorDboardComponent } from './doctor-dboard.component';

describe('DoctorDboardComponent', () => {
  let component: DoctorDboardComponent;
  let fixture: ComponentFixture<DoctorDboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorDboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorDboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
