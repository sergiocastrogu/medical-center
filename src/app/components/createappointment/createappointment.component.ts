import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/models/request/appointment-save';
import { ResponseBase } from 'src/app/models/response/response-base';
import { User } from 'src/app/models/response/user';
import { UserListResponse } from 'src/app/models/response/user-list-response';
import { MedicalAppointmentService } from 'src/app/services/medical-appointment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createappointment',
  templateUrl: './createappointment.component.html',
  styleUrls: ['./createappointment.component.scss']
})
export class CreateappointmentComponent implements OnInit {

  listDoctor: User[] = [];
  listUsers: User[] = [];
  appointment!: Appointment;
  formGroup!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateappointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private medicalService: MedicalAppointmentService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.pageLoad();
  }

  pageLoad(){
    this.loadForm();
    this.loadDoctorList();
    this.loadUsersList();
  }


  loadForm() {
    this.formGroup = this.formBuilder.group({
      userDoctorId: new FormControl(),
      userPatientId: new FormControl(),
      date: new FormControl(),
      observations: new FormControl(),
    });
  }

  loadDoctorList() {
    this.userService.getUserByUserType(1).subscribe({
      next: (data: ResponseBase<UserListResponse>) => {
        this.listDoctor = data.data.users;
      },
      error: (error: HttpErrorResponse) => {
        console.info(error);
      },
    });
  }

  loadUsersList() {
    this.userService.getUserByUserType(2).subscribe({
      next: (data: ResponseBase<UserListResponse>) => {
        this.listUsers = data.data.users;
      },
      error: (error: HttpErrorResponse) => {
        console.info(error);
      },
    });
  }

  create(){
    this.appointment = {
      date: this.formGroup.get('date')?.value,
      userDoctorId: this.formGroup.get('userDoctorId')?.value,
      userPatientId: this.formGroup.get('userPatientId')?.value,
      observations: this.formGroup.get('observations')?.value,
      stateId: 1,
      id: 0
    } 
    this.medicalService.saveAppointment(this.appointment).subscribe({
      next: (data: ResponseBase<number>)=> {
        this.dialogRef.close(this.appointment);
      }, 
      error: (error: HttpErrorResponse)=> {
        console.warn(error);
        this.dialogRef.close();
      }
    })
  }

}
