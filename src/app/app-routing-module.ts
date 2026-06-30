import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Register} from './components/register-athlete/register';
import {Home} from './components/home/home';
import {Login} from './components/login/login';
import {HomeAthlete} from './components/home-athlete/home-athlete';
import {athleteGuard} from './security/athlete';
import {Booking} from './components/booking-occurrence/booking';
import {HomeAdmin} from './components/home-admin/home-admin';
import {adminGuard} from './security/admin';
import {RegisterPt} from './components/register-pt/register-pt';
import {RegisterCourse} from './components/register-course/register-course';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'athlete', component: HomeAthlete, canActivate: [athleteGuard] },
  { path: 'booking', component: Booking, canActivate: [athleteGuard]},
  { path: 'admin', component: HomeAdmin,  canActivate: [adminGuard]},
  { path: 'register-pt', component: RegisterPt},
  { path: 'create-course', component: RegisterCourse},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
