import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegisterDoctorComponent } from './admin-register-doctor.component';

describe('AdminRegisterDoctorComponent', () => {
  let component: AdminRegisterDoctorComponent;
  let fixture: ComponentFixture<AdminRegisterDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegisterDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRegisterDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
