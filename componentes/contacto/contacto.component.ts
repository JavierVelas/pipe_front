// contacto.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  copiarAlPortapapeles(texto: string) {
    navigator.clipboard.writeText(texto).then(
      () => {
        console.log('Correo copiado al portapapeles');
        alert('Correo copiado al portapapeles');
      },
      (err) => {
        console.error('Error al copiar al portapapeles', err);
      }
    );
  }

  onMouseOver() {
    console.log('Mouse sobre el botón');
    // Puedes agregar aquí lógica adicional, como cambiar el estilo del botón.
  }

  onMouseOut() {
    console.log('Mouse fuera del botón');
    // Aquí puedes restablecer el estilo original del botón si lo cambiaste.
  }
}
