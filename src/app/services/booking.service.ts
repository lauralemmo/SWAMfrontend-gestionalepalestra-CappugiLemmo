import { Injectable } from '@angular/core';
import { BookingModel } from '../models/booking.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/SWAM-Cappugi-Lemmo-1.0-SNAPSHOT/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(request: BookingModel): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, request);
  }
}
