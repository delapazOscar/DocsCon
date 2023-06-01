import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(): boolean {
  //   if (this.authService.isLoggedIn()) {
  //     return true; // El usuario está autenticado, permite la navegación
  //   } else {
  //     this.router.navigate(['login']); // Redirecciona al inicio de sesión si el usuario no está autenticado
  //     return false; // Bloquea la navegación
  //   }
  // }
}
