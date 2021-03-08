import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Booking, DeleteBookingDto } from '../_models';

@Injectable()
export class BookingService {
  constructor(private readonly http: HttpClient) {}

  private readonly URL = `${environment.url}/booking`;

  public fetchActive(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.URL}`);
  }

  public fetchInactive(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.URL}/past/all`);
  }

  public save(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.URL}`, booking);
  }

  public delete(id: number): Observable<DeleteBookingDto> {
    return this.http.delete<DeleteBookingDto>(`${this.URL}/${id}`);
  }
}
