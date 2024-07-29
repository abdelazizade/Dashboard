import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, UserDetails } from '../interface/userInterface';
import { Observable } from 'rxjs';
import { domainName } from '../domails/userDomain';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${domainName}?page=${page}`);
  }

  getUser(id: number): Observable<UserDetails> {
    return this.http.get<UserDetails>(`${domainName}/${id}`);
  }
}
