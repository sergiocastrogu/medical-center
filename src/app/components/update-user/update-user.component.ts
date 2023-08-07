import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResponseBase } from 'src/app/models/response/response-base';
import { User } from 'src/app/models/response/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  formGroup!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private formBuilder: FormBuilder,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(){
    this.formGroup =  this.formBuilder.group({
      firstName:  new FormControl(this.data.firstName),
      lastName:  new FormControl(this.data.lastName),
      active:  new FormControl(this.data.active)
    });
  }

  update(){
    this.data.firstName = this.formGroup.get('firstName')?.value;
    this.data.lastName = this.formGroup.get('lastName')?.value;
    this.data.active = this.formGroup.get('active')?.value;
    this.userService.updateUser(this.data).subscribe({
      next:(data: ResponseBase<number>)=> {
        this.dialogRef.close();
      },
      error: (error: HttpErrorResponse)=> {
        console.info(error);
        this.dialogRef.close();
      }
    })
    
  }

}
