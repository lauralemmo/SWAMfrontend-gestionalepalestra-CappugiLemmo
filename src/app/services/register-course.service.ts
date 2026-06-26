import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PersonalTrainerModel} from '../models/personalTrainer.model';
import {Observable} from 'rxjs';
import {CourseModel} from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class RegisterCourseService {

  private apiUrl = 'http://localhost:8080/SWAM-Cappugi-Lemmo-1.0-SNAPSHOT/api/courses';

  constructor(private http: HttpClient) {}

  createCourse(course: CourseModel): Observable<CourseModel> {
    return this.http.post<CourseModel>(`${this.apiUrl}/register`, course);
  }

}
