import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AthleteModel} from '../models/athlete.model';
import {Observable} from 'rxjs';
import {OccurrenceModel} from '../models/occurrence.model';

@Injectable({
  providedIn: 'root',
})



export class OccurrenceService {
  private apiUrl = 'http://localhost:8080/SWAM-Cappugi-Lemmo-1.0-SNAPSHOT/api/occurrences';

  constructor(private http: HttpClient) {}

  getOccurrences() {
    return this.http.get<OccurrenceModel[]>(`${this.apiUrl}/all`);
  }


}
