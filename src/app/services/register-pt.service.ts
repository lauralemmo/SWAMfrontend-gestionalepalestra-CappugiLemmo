import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AthleteModel} from '../models/athlete.model';
import {Observable} from 'rxjs';
import {PersonalTrainerModel} from '../models/personalTrainer.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterPtService {

  private apiUrl = 'http://localhost:8080/SWAM-Cappugi-Lemmo-1.0-SNAPSHOT/api/personaltrainer';

  constructor(private http: HttpClient) {}

  createPersonalTrainer(pt: PersonalTrainerModel): Observable<PersonalTrainerModel> {
    return this.http.post<PersonalTrainerModel>(`${this.apiUrl}`, pt);
  }


}
