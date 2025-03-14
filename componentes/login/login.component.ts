import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string = '';
  contrasena: string = '';
  error: string = '';
  isLocked: boolean = false;
  lockTime: number = 10; 
  maxAttempts: number = 5;
  attempts: number = 0;
  showModal: boolean = false;

  private apiUrl = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const lockedUntil = localStorage.getItem('lockedUntil');
    if (lockedUntil) {
      const lockedUntilTime = parseInt(lockedUntil, 10);
      const currentTime = new Date().getTime();
      if (currentTime < lockedUntilTime) {
        this.isLocked = true;
        this.startLockCountdown((lockedUntilTime - currentTime) / 1000);
      }
    }
  }

  handleLogin() {
    if (this.isLocked) {
      this.error = `Debe esperar ${Math.ceil((parseInt(localStorage.getItem('lockedUntil') || '0', 10) - new Date().getTime()) / 1000)} segundos antes de intentar de nuevo.`;
      return;
    }

    if (!this.usuario || !this.contrasena) {
      this.error = 'Debe llenar todos los campos.';
      return;
    }

    const credentials = {
      usuario: this.usuario,
      contrasena: this.contrasena
    };

    this.http.post<any>(this.apiUrl, credentials).subscribe(res => {
      console.log('Respuesta del servidor:', res);
      if (res.success) {
        localStorage.setItem('usuario', this.usuario);
        localStorage.removeItem('lockedUntil'); // Limpiar bloqueo al iniciar sesión exitosamente
        localStorage.removeItem('attempts'); // Limpiar intentos al iniciar sesión exitosamente
        console.log('Login exitoso');
        this.router.navigate(['inicio']);
      } else {
        this.error = res.message || 'Usuario o contraseña incorrectos.';
        this.incrementAttempts();
      }
    }, err => {
      this.error = 'Error en el servidor. Inténtelo más tarde.';
      this.incrementAttempts();
    });
  }

  incrementAttempts() {
    this.attempts = parseInt(localStorage.getItem('attempts') || '0', 10) + 1;
    localStorage.setItem('attempts', this.attempts.toString());
    console.log('Intentos fallidos:', this.attempts);
    if (this.attempts >= this.maxAttempts) {
      this.lockLogin();
      this.sendEmail();
    }
  }

  lockLogin() {
    this.isLocked = true;
    const lockedUntil = new Date().getTime() + this.lockTime * 1000;
    localStorage.setItem('lockedUntil', lockedUntil.toString());
    console.log('Login bloqueado hasta:', new Date(lockedUntil));
    this.startLockCountdown(this.lockTime);
  }

  startLockCountdown(seconds: number) {
    const interval = setInterval(() => {
      if (seconds > 0) {
        this.error = `Demasiados intentos fallidos. Debe esperar ${seconds--} segundos antes de intentar de nuevo.`;
      } else {
        clearInterval(interval);
        this.isLocked = false;
        this.error = '';
        localStorage.removeItem('attempts');
      }
    }, 1000);
  }

  sendEmail() {
    const templateParams = {
      to_email: 'recipient@example.com',
      message: `Se ha alcanzado el máximo de intentos fallidos de inicio de sesión para el usuario ${this.usuario}.`
    };

    emailjs.send('service_o0dju72', 'template_fw98ehe', templateParams, '3fssA4Flpz0Pbiqhu')
      .then(() => {
        console.log('Correo enviado con éxito.');
        this.showModal = true;
        setTimeout(() => {
          this.closeModal();
        }, 1000);  // Mostrar el modal por 1 segundo antes de redirigir
      }, (err: EmailJSResponseStatus) => {
        console.log('Fallo al enviar el correo...', err.text);
        this.error = 'No se pudo enviar el correo. Inténtalo nuevamente.';
      });
  }

  closeModal(): void {
    this.showModal = false;
    this.router.navigate(['/login']);
  }
}
