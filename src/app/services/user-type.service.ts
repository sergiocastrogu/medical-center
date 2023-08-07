import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseBase } from '../models/response/response-base';
import { UserTypeList } from '../models/response/user-type-list-response';

@Injectable({
  providedIn: 'root',
})
export class UserTypeService {
  controller = `${environment.api}/UserType/`;
  constructor(private http: HttpClient) {}

  getAllUserTypes() {
    this.http.get<ResponseBase<UserTypeList>>(this.controller + 'all');
  }
}
