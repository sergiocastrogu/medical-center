import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseBase } from '../models/response/response-base';
import { UserResponse } from '../models/response/user-response';
import { UserListResponse } from '../models/response/user-list-response';
import { User } from '../models/response/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  controller = `${environment.api}/User/`;
  constructor(private http: HttpClient) {}

  getUserById(userId: number) {
    return this.http.get<ResponseBase<UserResponse>>(
      this.controller + 'get-id?Id=' + userId
    );
  }

  getUserByUserType(userType: number) {
    return this.http.get<ResponseBase<UserListResponse>>(
      this.controller + 'get-type?TypeId=' + userType
    );
  }

  updateUser(user: User) {
    return this.http.put<ResponseBase<number>>(
      this.controller + 'update',
      user
    );
  }

  createUser(user: User) {
    return this.http.post<ResponseBase<number>>(
      this.controller + 'register',
      user
    );
  }
}
