import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDboardComponent } from './admin-dboard.component';

describe('AdminDboardComponent', () => {
  let component: AdminDboardComponent;
  let fixture: ComponentFixture<AdminDboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
