import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseBase } from '../models/response/response-base';
import { AppointmentIdResponse } from '../models/response/appointment-id-response';
import { AppointmentListResponse } from '../models/response/appointment-list-response';
import { Appointment } from '../models/request/appointment-save';

@Injectable({
  providedIn: 'root',
})
export class MedicalAppointmentService {
  controller = `${environment.api}/MedicalAppointment/`;
  constructor(private http: HttpClient) {}

  getAppointmentById(appointmentId: number) {
    return this.http.get<ResponseBase<AppointmentIdResponse>>(
      this.controller + 'get-id?Id=' + appointmentId
    );
  }

  getAppointmentByDoctor(doctorId: number) {
    return this.http.get<ResponseBase<AppointmentListResponse>>(
      this.controller + 'get-doctor?DoctorId=' + doctorId
    );
  }

  getAppointmentByUser(userId: number) {
    return this.http.get<ResponseBase<AppointmentListResponse>>(
      this.controller + 'get-patient?PatientId=' + userId
    );
  }

  saveAppointment(appointment: Appointment) {
    return this.http.post<ResponseBase<number>>(
      this.controller + 'register',
      appointment
    );
  }

  updateAppointment(appointment: Appointment) {
    return this.http.put<ResponseBase<number>>(
      this.controller + 'update',
      appointment
    );
  }
}
