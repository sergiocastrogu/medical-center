import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateappointmentComponent } from './createappointment.component';

describe('CreateappointmentComponent', () => {
  let component: CreateappointmentComponent;
  let fixture: ComponentFixture<CreateappointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateappointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateappointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
