import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AthleteService} from '../../services/athlete.service';
import {Router} from '@angular/router';
import {AthleteModel} from '../../models/athlete.model';


@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})



export class Register {
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private athleteService: AthleteService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      codicefiscale: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      nascita: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      altezza: [''],
      peso: [''],
      abbonamento: ['', Validators.required],
      inizio: ['', Validators.required]
    });
  }



  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    const formValue = this.myForm.value;

    const athlete: AthleteModel = {
      tax_code: formValue.codicefiscale,
      name: formValue.nome,
      surname: formValue.cognome,
      username: formValue.username,
      password: formValue.password,
      email: formValue.email,
      phone_number: formValue.telefono,
      birth_date: this.formatDate(formValue.nascita),
      height: formValue.altezza,
      weight: formValue.peso,
      subscriptionType: formValue.abbonamento,
      startDate: this.formatDate(formValue.inizio)
    };

    this.athleteService.saveAthlete(athlete).subscribe({
      next: (response) => {
        console.log('Atleta registrato con successo', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Errore durante la registrazione', err);
      }
    });
  }

  private formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



}
