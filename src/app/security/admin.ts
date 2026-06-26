import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  console.log('--- ADMIN GUARD CHECK ---');
  console.log('Token trovato:', !!token);
  console.log('Ruolo trovato:', role);
  // Controlla se il token esiste e se il ruolo è esattamente ADMIN
  if (token && role === 'ADMIN') {
    return true;
  } else {
    alert('Accesso negato. Area riservata agli amministratori.');
    router.navigate(['/login']);
    return false;
  }
};
