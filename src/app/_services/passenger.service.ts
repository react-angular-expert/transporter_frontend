import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, Passenger, ContactHelp, UpdatePassengerDto } from './../_models';
import { environment } from './../../environments/environment';

@Injectable()
export class PassengerService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL = `${environment.url}/passenger`;

  public fetch(id: string): Observable<Passenger> {
    return this.http.get<Passenger>(`${this.URL}/${+id}`);
  }

  public update(updatePassengerDto: UpdatePassengerDto): Observable<Passenger> {
    return this.http.put<Passenger>(`${this.URL}/${updatePassengerDto.id}`, updatePassengerDto);
  }

  public sendMessage(contactHelp: ContactHelp): Observable<Message> {
    return this.http.post<Message>(`${this.URL}/contact`, contactHelp);
  }
}
