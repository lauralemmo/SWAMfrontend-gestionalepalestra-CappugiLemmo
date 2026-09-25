import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingResponse } from '../../models/booking-response.model';

@Component({
  selector: 'app-view-booking',
  standalone: false,
  templateUrl: './view-booking.html',
  styleUrls: ['./view-booking.css'],
})
export class ViewBooking implements OnInit {
  displayableBookings: any[] = [];
  isLoading = true;

  // Sostituiamo 'courseId' con 'courseName'
  displayedColumns: string[] = ['courseName', 'date', 'hours'];

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.bookingService.getMyBookings().subscribe({
      next: (data: BookingResponse[]) => {
        if (!Array.isArray(data)) {
          this.isLoading = false;
          this.cdr.detectChanges();
          return;
        }

        this.displayableBookings = data
          .map(booking => {
            try {
              if (!booking || !booking.date || !booking.hours) return null;

              const year = booking.date[0];
              const month = String(booking.date[1]).padStart(2, '0');
              const day = String(booking.date[2]).padStart(2, '0');
              const dateStr = `${day}/${month}/${year}`;

              const hour = String(booking.hours[0]).padStart(2, '0');
              const minute = String(booking.hours[1] ?? 0).padStart(2, '0');
              const hoursStr = `${hour}:${minute}`;

              return {
                courseName: booking.courseName, // <-- Mappiamo il nome del corso
                date: dateStr,
                hours: hoursStr,
              };
            } catch (e) {
              console.error('Errore trasformazione:', e);
              return null;
            }
          })
          .filter(booking => booking !== null);

        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Errore grave:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
