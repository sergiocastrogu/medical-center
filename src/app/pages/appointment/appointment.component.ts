import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/request/appointment-save';
import { AppointmentIdResponse } from 'src/app/models/response/appointment-id-response';
import { AppointmentListResponse } from 'src/app/models/response/appointment-list-response';
import { ResponseBase } from 'src/app/models/response/response-base';
import { ListStateRespose, State } from 'src/app/models/response/state-response';
import { User } from 'src/app/models/response/user';
import { UserListResponse } from 'src/app/models/response/user-list-response';
import { MedicalAppointmentService } from 'src/app/services/medical-appointment.service';
import { StateService } from 'src/app/services/state.service';
import { UserTypeService } from 'src/app/services/user-type.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from 'src/app/components/generic-dialog/generic-dialog.component';
import { CreateappointmentComponent } from 'src/app/components/createappointment/createappointment.component';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  listDoctor: User[] = [];
  listUsers: User[] = [];
  listStates: State[] = [];
  selectedUser!: User | undefined;
  selectedDoctor!: User | undefined;
  selectAppointment: number | undefined;
  listAppointment: Appointment[] = [];

  constructor(
    private medicalService: MedicalAppointmentService,
    private stateService: StateService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.pageLoad();
  }

  pageLoad() {
    this.loadDoctorList();
    this.loadUsersList();
    this.getListStates();
  }

  getListStates(){
    this.stateService.getAllStates().subscribe({
      next: (data: ResponseBase<ListStateRespose>) => {
        this.listStates = data.data.states;
      }, 
      error: (error: HttpErrorResponse)=> {
        console.warn(error);
      }
    })
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

  getAppointmentByDoctor() {
    this.selectedUser = undefined;
    this.selectAppointment = undefined;
  }

  getAppointmentByUser() {
    this.selectedDoctor = undefined;
    this.selectAppointment = undefined;
  }

  getAppointmentById() {
    this.selectedDoctor = undefined;
    this.selectedUser = undefined;
  }

  search() {
    if (this.selectedDoctor) {
      this.searchByDoctor();
    } else if (this.selectedUser) {
      this.searchByUser()
    } else if (this.selectAppointment) {
      this.searchById();
    }
  }

  searchByDoctor() {
    this.medicalService
      .getAppointmentByDoctor(this.selectedDoctor!.id)
      .subscribe({
        next: (data: ResponseBase<AppointmentListResponse>) => {
          this.listAppointment = data.data.medicals;
        },
        error: (error: HttpErrorResponse) => {
          console.info(error);
        },
      });
  }

  searchByUser() {
    this.medicalService
      .getAppointmentByUser(this.selectedUser!.id)
      .subscribe({
        next: (data: ResponseBase<AppointmentListResponse>) => {
          this.listAppointment = data.data.medicals;
        },
        error: (error: HttpErrorResponse) => {
          console.info(error);
        },
      });
  }

  searchById() {
    this.medicalService
      .getAppointmentById(this.selectAppointment!)
      .subscribe({
        next: (data: ResponseBase<AppointmentIdResponse>) => {
          this.listAppointment = [];
          this.listAppointment.push(data.data.medical);
        },
        error: (error: HttpErrorResponse) => {
          console.info(error);
        },
      });
  }

  getNameDoctor(id: number): string{
    if(id <= 0){
      return 'NA'
    }
    let doctor = this.listDoctor.filter(d => d.id == id)[0];
    return `${doctor.firstName} ${doctor.lastName}`;
  }

  getNameUser(id: number): string{
    if(id <= 0){
      return 'NA'
    }
    let user = this.listUsers.filter(d => d.id == id)[0];
    return `${user.firstName} ${user.lastName}`;
  }

  getState(id: number): string{
    if(id <= 0){
      return 'NA'
    }
    let state = this.listStates.filter(d => d.id == id)[0];
    return state.name;
  }

  updateClient(appointment: Appointment, stateId: number){
    appointment.stateId = stateId;
    this.medicalService
      .updateAppointment(appointment)
      .subscribe({
        next: (data: ResponseBase<number>) => {
          let message;
          if(stateId == 2){
            message = 'Se ha cambiado el estado en programado'
          } else {
            message = 'Se ha cambiado el estado en finalizado'
          }
          const dialogRef = this.dialog.open(GenericDialogComponent, {
            data: message
          });
        },
        error: (error: HttpErrorResponse) => {
          console.info(error);
        },
      });
  }

  createAppointment(){
    const dialogRef = this.dialog.open(CreateappointmentComponent, {});
    dialogRef.afterClosed().subscribe((data: Appointment)=>{
      this.selectedDoctor = this.listDoctor.filter(d => d.id == data.userDoctorId)[0];
      this.selectedUser = undefined;
      this.selectAppointment = undefined;
      this.search();
    })
  }
}
