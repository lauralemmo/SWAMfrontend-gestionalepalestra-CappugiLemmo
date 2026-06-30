import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Register } from './components/register-athlete/register';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/input';

import { MatInputModule } from '@angular/material/input';
import { MatDatepicker, MatDatepickerToggle } from '@angular/material/datepicker';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import {
  MatCard,
  MatCardModule,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeAthlete } from './components/home-athlete/home-athlete';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './security/auth.interceptor';
import { Booking } from './components/booking-occurrence/booking';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HomeAdmin } from './components/home-admin/home-admin';
import { RegisterPt } from './components/register-pt/register-pt';
import { RegisterCourse } from './components/register-course/register-course';
import { BookingDialog } from './components/booking-dialog/booking-dialog';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    App,
    Register,
    Login,
    Home,
    HomeAthlete,
    Booking,
    BookingDialog,
    HomeAdmin,
    RegisterPt,
    RegisterCourse,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelect,
    MatOption,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [App],
})
export class AppModule {}
