import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AthleteService} from '../../services/athlete.service';
import {Router} from '@angular/router';
import {RegisterPtService} from '../../services/register-pt.service';

@Component({
  selector: 'app-register-pt',
  standalone: false,
  templateUrl: './register-pt.html',
  styleUrl: './register-pt.css',
})
export class RegisterPt {
  ptForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ptService: RegisterPtService,
    private router: Router
  ){
    this.ptForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      tax_code: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      birth_date: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      salary: ['', [Validators.required]],
      active: [true]
    });
  }

  onPtSubmit() {
    if (this.ptForm.valid) {
      this.ptService.createPersonalTrainer(this.ptForm.value).subscribe({
        next: (res) => {
          // Il tuo backend restituisce l'oggetto creato col suo ID unico
          alert(`Personal Trainer "${res.name} ${res.surname}" registrato con successo!`);
          this.ptForm.reset({ salary: 1200 });
        },
        error: (err) => {
          console.error(err);
          alert('Errore registrazione PT: ' + (err.error || 'Username o Email già esistenti.'));
        }
      });
    }
  }

}
