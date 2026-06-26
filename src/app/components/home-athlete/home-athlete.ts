import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-athlete',
  standalone: false,
  templateUrl: './home-athlete.html',
  styleUrl: './home-athlete.css',
})
export class HomeAthlete {

  constructor(private router: Router) {}

  create(): void{
    this.router.navigate(['/booking']);
  }

}
