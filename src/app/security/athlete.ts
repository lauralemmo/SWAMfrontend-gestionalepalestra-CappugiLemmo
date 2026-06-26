import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const athleteGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  console.log('--- ATHLETE GUARD CHECK ---');
  console.log('Token trovato:', !!token);
  console.log('Ruolo trovato:', role);
  // Lascia passare solo se il token esiste ed il ruolo è esattamente ATHLETE
  if (token && role === 'ATHLETE') {
    return true;
  } else {
    alert('Accesso negato. Area riservata agli atleti.');
    router.navigate(['/login']);
    return false;
  }
};
