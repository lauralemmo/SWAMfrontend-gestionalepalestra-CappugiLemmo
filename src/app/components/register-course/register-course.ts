import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegisterPtService} from '../../services/register-pt.service';
import {Router} from '@angular/router';
import {RegisterCourseService} from '../../services/register-course.service';

@Component({
  selector: 'app-register-course',
  standalone: false,
  templateUrl: './register-course.html',
  styleUrl: './register-course.css',
})
export class RegisterCourse {

  cForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cService: RegisterCourseService,
    private router: Router
  ){
    this.cForm = this.fb.group({
      nome: ['', [Validators.required]],
      numMax: ['', [Validators.required]],
      idPersonalTrainer: ['', [Validators.required]],
      numMembers: [0]
    });
  }

  onCourseSubmit() {
    if (this.cForm.valid) {
      this.cService.createCourse(this.cForm.value).subscribe({
        next: (res) => {
          alert('Corso "${res.name}" inserito con successo con ID: ${res.idCourse}');
          this.cForm.reset({ maxMembers: 10 }); // Resetta il form impostando il default
        },
        error: (err) => {
          console.error(err);
          alert('Errore durante l\'inserimento del corso: ' + (err.error || 'Verifica i permessi JWT.'));
        }
      });
    }
  }


}
