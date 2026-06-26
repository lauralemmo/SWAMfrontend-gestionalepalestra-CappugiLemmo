import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import {OccurrenceModel} from '../../models/occurrence.model';
import {HttpClient} from '@angular/common/http';
import {OccurrenceService} from '../../services/occurrence.service';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})


export class Booking implements OnInit {

  view: CalendarView = CalendarView.Week;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();

  private occorrenze: OccurrenceModel[] = [];
  eventiPalestra: CalendarEvent[] = [];

  private dayOfWeekOffset: Record<string, number> = {
    MONDAY: 0,
    TUESDAY: 1,
    WEDNESDAY: 2,
    THURSDAY: 3,
    FRIDAY: 4,
    SATURDAY: 5,
    SUNDAY: 6,
  };

  private coloriCorsi: Record<string, { primary: string; secondary: string }> = {
    zumba:    { primary: '#ec407a', secondary: '#fce4ec' },
    acquagym:     { primary: '#7e57c2', secondary: '#ede7f6' },
    pilates:  { primary: '#26a69a', secondary: '#e0f2f1' },
    bodybuilding: { primary: '#43a047', secondary: '#e8f5e9' },
    gag: { primary: '#ff7043', secondary: '#fbe9e7' },
    totalbodyworkout: { primary: '#1e88e5', secondary: '#e3f2fd' }
  };

  private coloreDefault = { primary: '#42a5f5', secondary: '#e3f2fd' };




  constructor(private http: HttpClient, private occurrenceService: OccurrenceService) {}


  ngOnInit(): void {
    this.caricaOccorrenze();
  }


  caricaOccorrenze(): void {
    this.occurrenceService.getOccurrences()
      .subscribe({
        next: (data) => {
          this.occorrenze = data;
          this.generaEventiSettimana();
        },
        error: (err) => {
          console.error('Errore nel caricamento delle occorrenze:', err);
        }
      });
  }


  private parseHours(hours: any): [number, number] {
    // caso array [9, 0] — quello che arriva dal tuo backend
    if (Array.isArray(hours)) {
      return [hours[0] || 0, hours[1] || 0];
    }

    // caso stringa "09:00:00"
    if (typeof hours === 'string') {
      const parts = hours.split(':').map(Number);
      return [parts[0] || 0, parts[1] || 0];
    }

    // caso oggetto { hour: 9, minute: 0 }
    if (typeof hours === 'object' && hours !== null) {
      return [hours.hour || 0, hours.minute || 0];
    }

    return [0, 0];
  }


  generaEventiSettimana(): void {
    const lunedi = this.getLunedi(this.viewDate);

    this.eventiPalestra = this.occorrenze.map(occ => {
      const offset = this.dayOfWeekOffset[occ.dayOfWeek] ?? 0;

      const [ore, minuti] = this.parseHours(occ.hours);

      const start = new Date(lunedi);
      start.setDate(lunedi.getDate() + offset);
      start.setHours(ore, minuti, 0, 0);

      const end = new Date(start);
      end.setHours(start.getHours() + 1, start.getMinutes(), 0, 0);

      return {
        id: occ.idOccurrence,
        title: occ.courseName,
        start,
        end,
        color: this.coloriCorsi[occ.courseName] ?? this.coloreDefault,
        meta: {
          idOccurrence: occ.idOccurrence,
          courseId: occ.courseId,
        }
      };
    });

    this.refresh.next();
  }


  private getLunedi(data: Date): Date {
    const d = new Date(data);
    const giorno = d.getDay();
    const diff = giorno === 0 ? -6 : 1 - giorno;
    d.setDate(d.getDate() + diff);
    d.setHours(0, 0, 0, 0);
    return d;
  }


  settimanaPrecedente(): void {
    const nuova = new Date(this.viewDate);
    nuova.setDate(nuova.getDate() - 7);
    this.viewDate = nuova;
    this.generaEventiSettimana();
  }


  settimanaSuccessiva(): void {
    const nuova = new Date(this.viewDate);
    nuova.setDate(nuova.getDate() + 7);
    this.viewDate = nuova;
    this.generaEventiSettimana();
  }


  oggi(): void {
    this.viewDate = new Date();
    this.generaEventiSettimana();
  }


  eventoCliccato(evento: any): void {
    const e = evento.event;
    console.log('Evento cliccato:', e);
    // qui in futuro apriremo un mat-dialog per la prenotazione
  }


}
