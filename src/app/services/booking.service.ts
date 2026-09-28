import { Injectable } from '@angular/core';
import { BookingModel } from '../models/booking.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BookingResponse } from '../models/booking-response.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/SWAM-Cappugi-Lemmo-1.0-SNAPSHOT/api/bookings';

  constructor(private http: HttpClient) {}

  createBooking(request: BookingModel): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/register`, request);
  }

  getLessonOccupancy(occurrenceId: number, date: string): Observable<{ booked: number }> {
    const params = new HttpParams()
      .set('occurrenceId', occurrenceId.toString())
      .set('date', date);

    return this.http.get<{ booked: number }>(
      `${this.apiUrl}/lesson-occupancy`,
      { params },
    );
  }

  getMyBookings(): Observable<BookingResponse[]> {
    return this.http.get<BookingResponse[]>(`${this.apiUrl}/my-bookings`);
  }
}
