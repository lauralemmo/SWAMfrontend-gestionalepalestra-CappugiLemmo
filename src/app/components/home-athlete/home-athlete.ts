import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-athlete',
  standalone: false,
  templateUrl: './home-athlete.html',
  styleUrl: './home-athlete.css',
})
export class HomeAthlete {
  username: string | null;
  constructor(private router: Router) {
    this.username = localStorage.getItem('username');
  }

  create(): void{
    this.router.navigate(['/booking']);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  viewBookings(): void {
    this.router.navigate(['/my-bookings']);
  }
}
