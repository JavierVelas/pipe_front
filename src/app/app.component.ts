import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend'; // Define title como una propiedad string

  updateTitle(newTitle: string): void {
    this.title = newTitle;
  }

  deferredPrompt: any; // Almacena el evento beforeinstallprompt
  showInstallButton = false; // Controla la visibilidad del botón de instalación

  constructor() {
    // Escucha el evento beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault(); // Evita que el prompt se muestre automáticamente
      this.deferredPrompt = event; // Almacena el evento
      this.showInstallButton = true; // Muestra el botón de instalación
    });
  }

  
  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt(); 
      this.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Usuario aceptó la instalación');
        } else {
          console.log('Usuario rechazó la instalación');
        }
        this.deferredPrompt = null; 
        this.showInstallButton = false; 
      });
    }
  }
}