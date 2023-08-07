import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ResponseBase } from 'src/app/models/response/response-base';
import { User } from 'src/app/models/response/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss']
})
export class CreateUserModalComponent implements OnInit {
  
  
  formGroup!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<CreateUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(){
    this.formGroup =  this.formBuilder.group({
      firstName:  new FormControl(),
      lastName:  new FormControl(),
      birthDate: new FormControl()
    });
  }

  create(){
    let user: User = {
      typeId: this.data,
      firstName:  this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      active: true,
      birthDate: this.formGroup.get('birthDate')?.value,
      id: 0
    }
    this.userService.createUser(user).subscribe({
      next: (data: ResponseBase<number>)=> {
        this.dialogRef.close();
      }, 
      error: (error: HttpErrorResponse)=> {
        console.warn(error);
        this.dialogRef.close();
      } 
    })
  }

}
