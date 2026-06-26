import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-admin',
  standalone: false,
  templateUrl: './home-admin.html',
  styleUrl: './home-admin.css',
})
export class HomeAdmin {

  constructor(private router: Router) {}

  create_pt(): void{
    this.router.navigate(['/register-pt']);
  }

  create_c(): void{
    this.router.navigate(['/create-course']);
  }

}
