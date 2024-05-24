import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesOfferedComponent } from './services-offered.component';

describe('ServicesOfferedComponent', () => {
  let component: ServicesOfferedComponent;
  let fixture: ComponentFixture<ServicesOfferedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesOfferedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesOfferedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
