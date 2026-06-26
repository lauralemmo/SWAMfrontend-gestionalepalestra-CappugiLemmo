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
      nome: ['', [Validators.required]],
      cognome: ['', [Validators.required]],
      codicefiscale: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      nascita: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      stipendio: ['', [Validators.required]],
      active: [true]
    });
  }

  onPtSubmit() {
    if (this.ptForm.valid) {
      this.ptService.createPersonalTrainer(this.ptForm.value).subscribe({
        next: (res) => {
          // Il tuo backend restituisce l'oggetto creato col suo ID unico
          alert('Personal Trainer "${res.name} ${res.surname}" registrato con successo!\nPrendi nota del suo ID generato: ${res.id}');
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
