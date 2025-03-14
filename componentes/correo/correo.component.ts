import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.css']
})
export class CorreoComponent {
  error: string = '';
  showModal: boolean = false;

  constructor(private router: Router) {}

  public sendEmail(e: Event) {
    e.preventDefault();

    emailjs.sendForm('service_o0dju72', 'template_fw98ehe', e.target as HTMLFormElement, '3fssA4Flpz0Pbiqhu')
      .then(
        () => {
          console.log('SUCCESS!');
          this.showModal = true;
          setTimeout(() => {
            this.closeModal();
          }, 1000);  // Mostrar el modal por 1 segundo antes de redirigir
        },
        (err: EmailJSResponseStatus) => {
          console.log('FAILED...', err.text);
          this.error = 'No se pudo enviar el correo. Inténtalo nuevamente.';
        },
      );
  }

  public closeModal(): void {
    this.showModal = false;
    this.router.navigate(['/login']);
  }
}
