import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { CreateappointmentComponent } from './createappointment/createappointment.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { GenericDialogComponent } from './generic-dialog/generic-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CreateUserModalComponent } from './create-user-modal/create-user-modal.component';



@NgModule({
  declarations: [
    TopbarComponent,
    CreateappointmentComponent,
    UpdateUserComponent,
    GenericDialogComponent,
    CreateUserModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  exports: [
    TopbarComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ComponentsModule { }
