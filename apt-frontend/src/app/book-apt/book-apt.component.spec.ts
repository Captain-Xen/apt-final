import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAptComponent } from './book-apt.component';

describe('BookAptComponent', () => {
  let component: BookAptComponent;
  let fixture: ComponentFixture<BookAptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookAptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
