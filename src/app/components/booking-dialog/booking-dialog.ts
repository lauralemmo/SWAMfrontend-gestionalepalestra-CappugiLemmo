import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-dialog',
  standalone: false,
  templateUrl: './booking-dialog.html',
  styleUrl: './booking-dialog.css',
})
export class BookingDialog implements OnInit {
  bookingForm: FormGroup;

  // Nuove proprietà per gestire l'occupazione
  postiOccupati: number = 0;
  isLoadingOccupancy: boolean = true;
  dataFormattataStringa: string;
  orarioFormattato: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef
  ) {
    const dataSelezionata = new Date(this.data.start);
    const anno = dataSelezionata.getFullYear();
    const mese = String(dataSelezionata.getMonth() + 1).padStart(2, '0');
    const giorno = String(dataSelezionata.getDate()).padStart(2, '0');
    this.dataFormattataStringa = `${anno}-${mese}-${giorno}`;

    this.orarioFormattato = this.data.hoursOriginal;
    if (Array.isArray(this.data.hoursOriginal)) {
      const ore = String(this.data.hoursOriginal[0]).padStart(2, '0');
      const minuti = String(this.data.hoursOriginal[1]).padStart(2, '0');
      this.orarioFormattato = `${ore}:${minuti}:00`;
    }

    this.bookingForm = this.fb.group({
      athleteId: [0],
      courseId: [this.data.courseId, [Validators.required]],
      date: [this.dataFormattataStringa, [Validators.required]],
      hours: [this.orarioFormattato, [Validators.required]]
    });
  }

  ngOnInit() {
    this.bookingService.getLessonOccupancy(this.data.courseId, this.dataFormattataStringa, this.orarioFormattato)
      .subscribe({
        next: (res) => {
          // Usiamo setTimeout per evitare l'errore NG0100 di Angular
          setTimeout(() => {
            this.postiOccupati = res.booked;
            this.isLoadingOccupancy = false;
            this.cdr.detectChanges();
          });
        },
        error: (err) => {
          console.error("Impossibile recuperare l'occupazione", err);
          setTimeout(() => {
            this.isLoadingOccupancy = false;
            this.cdr.detectChanges();
          });
        }
      });
  }

  get isPieno(): boolean {
    return this.postiOccupati >= this.data.numMax;
  }

  annulla() {
    this.dialogRef.close(false);
  }

  onBookingSubmit() {
    if (this.bookingForm.valid && !this.isPieno) {
      this.bookingService.createBooking(this.bookingForm.value).subscribe({
        next: () => {
          alert('Iscrizione avvenuta con successo!');
          this.dialogRef.close(true);
        },
        error: (err) => {
          if (err.status === 201 || (err.error && err.error.text && err.error.text.includes('Prenotazione registrata'))) {
            alert('Iscrizione avvenuta con successo!');
            this.dialogRef.close(true);
          } else {
            console.error('Il backend ha rifiutato la prenotazione:', err);
            const messaggioErrore = err.error || 'Impossibile completare la prenotazione.';
            alert(messaggioErrore);
            this.dialogRef.close(false);
          }
        }
      });
    }
  }
}
