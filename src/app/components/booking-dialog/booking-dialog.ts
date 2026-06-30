import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-dialog',
  standalone: false,
  templateUrl: './booking-dialog.html',
  styleUrl: './booking-dialog.css',
})
export class BookingDialog {
  bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private bookingService: BookingService
  ) {
    // 1. DATA BLINDATA: Trasformazione sicura in stringa YYYY-MM-DD
    const dataSelezionata = new Date(this.data.start);
    const anno = dataSelezionata.getFullYear();
    const mese = String(dataSelezionata.getMonth() + 1).padStart(2, '0');
    const giorno = String(dataSelezionata.getDate()).padStart(2, '0');
    const dataFormattataStringa = `${anno}-${mese}-${giorno}`;

    // 2. ORARIO FORMATTATO: Stringa standard "HH:mm:ss" come accettata dal LocalTime di Java
    let orarioFormattato = this.data.hoursOriginal;
    if (Array.isArray(this.data.hoursOriginal)) {
      const ore = String(this.data.hoursOriginal[0]).padStart(2, '0');
      const minuti = String(this.data.hoursOriginal[1]).padStart(2, '0');
      orarioFormattato = `${ore}:${minuti}:00`;
    }

    // 3. INIZIALIZZAZIONE FORM: athleteId viene impostato a 0 (o rimosso)
    // perché il backend ora lo ignora e usa lo username del Token!
    this.bookingForm = this.fb.group({
      athleteId: [0],
      courseId: [this.data.courseId, [Validators.required]],
      date: [dataFormattataStringa, [Validators.required]],
      hours: [orarioFormattato, [Validators.required]]
    });
  }

  annulla() {
    this.dialogRef.close(false);
  }

  onBookingSubmit() {
    if (this.bookingForm.valid) {
      console.log('Payload inviato al backend:', this.bookingForm.value);

      this.bookingService.createBooking(this.bookingForm.value).subscribe({
        next: () => {
          // Questo blocco scatterebbe solo se il backend restituisse un JSON valido
          alert('Iscrizione avvenuta con successo!');
          this.dialogRef.close(true);
        },
        error: (err) => {
          // CONTROLLO DI EMERGENZA: Se lo stato è 201 (Created), significa che sul DB è andata a buon fine!
          // Il "fallimento" è solo il parsing del testo in JSON.
          if (err.status === 201 || (err.error && err.error.text && err.error.text.includes('Prenotazione registrata'))) {
            alert('Iscrizione avvenuta con successo!');
            this.dialogRef.close(true);
          } else {
            // Questo è un vero errore del backend (es: corso pieno, già iscritto, ecc.)
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
