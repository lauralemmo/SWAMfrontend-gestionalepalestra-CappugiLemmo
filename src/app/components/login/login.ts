import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from '../../services/login.service';
import {AthleteModel} from '../../models/athlete.model';
import {LoginModel} from '../../models/login.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login {
  myForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  onLogin() {
    if (this.myForm.invalid) {
      return;
    }

    const formValue = this.myForm.value;

    const login: LoginModel = {
      username: formValue.username,
      password: formValue.password
    };

    this.errorMessage = '';  // reset errore ad ogni tentativo
    this.loginService.login(login).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
        localStorage.setItem('username', res.username);
        localStorage.setItem('idUser', res.idUser.toString());

        if (res.role === 'ADMIN') {
          this.router.navigate(['/admin']); // Rotta Admin
        } else if (res.role === 'ATHLETE') {
          this.router.navigate(['/athlete']); // Rotta Atleta
        } else if (res.role === 'PT'){
          this.router.navigate(['/login']); // Rotta PT
        }else {
          this.router.navigate(['/login']); // Default (PER ORA) -------- DA MODIFICARE!
        }
      },
      error: (err) => {
        console.error('Login fallito', err);
        alert('Credenziali non valide o errore del server');
      }
    });
  }


}
