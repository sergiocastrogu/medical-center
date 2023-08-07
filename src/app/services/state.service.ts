import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseBase } from '../models/response/response-base';
import { ListStateRespose } from '../models/response/state-response';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  controller = `${environment.api}/State/`;
  constructor(private http: HttpClient) {}

  getAllStates() {
    return this.http.get<ResponseBase<ListStateRespose>>(this.controller + 'all');
  }
}
