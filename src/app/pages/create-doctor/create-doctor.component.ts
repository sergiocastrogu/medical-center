import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserModalComponent } from 'src/app/components/create-user-modal/create-user-modal.component';
import { UpdateUserComponent } from 'src/app/components/update-user/update-user.component';
import { ResponseBase } from 'src/app/models/response/response-base';
import { User } from 'src/app/models/response/user';
import { UserListResponse } from 'src/app/models/response/user-list-response';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.scss']
})
export class CreateDoctorComponent implements OnInit {

  listUsers: User[] = [];
  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsersList();
  }

  loadUsersList() {
    this.userService.getUserByUserType(1).subscribe({
      next: (data: ResponseBase<UserListResponse>) => {
        this.listUsers = data.data.users;
      },
      error: (error: HttpErrorResponse) => {
        console.info(error);
      },
    });
  }

  updateUser(user: User){
    const dialogUpdate = this.dialog.open(UpdateUserComponent, {
      data: user
    })
    dialogUpdate.afterClosed().subscribe(()=> {
      this.loadUsersList();
    })
  }

  createUser(){
    const dialogCreate = this.dialog.open(CreateUserModalComponent, {data:1})
    dialogCreate.afterClosed().subscribe(()=> {
      this.loadUsersList();
    })
  }

}
