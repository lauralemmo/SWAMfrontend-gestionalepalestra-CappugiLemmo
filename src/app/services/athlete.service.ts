import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AthleteModel} from '../models/athlete.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})


export class AthleteService {
  private apiUrl = 'http://localhost:8080/SWAM-Cappugi-Lemmo-1.0-SNAPSHOT/api/athletes';

  constructor(private http: HttpClient) {}

  //post nuovo atleta
  saveAthlete(athlete: AthleteModel): Observable<AthleteModel> {
    return this.http.post<AthleteModel>(`${this.apiUrl}/register`, athlete);
  }

}
