import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Message, LoginPassengerDto, RegisterPassengerDto } from './../_models';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL = `${environment.url}/passenger`;

  public login(loginPassenger: LoginPassengerDto): Observable<string> {
    return this.http.post<string>(`${this.URL}/login`, loginPassenger, {
      responseType: 'text' as 'json',
    });
  }

  public register(registerPassenger: RegisterPassengerDto): Observable<Message> {
    return this.http.post<Message>(`${this.URL}`, registerPassenger);
  }
}
