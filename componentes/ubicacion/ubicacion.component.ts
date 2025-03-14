import { Component, OnInit } from '@angular/core';
import { UbicacionService } from 'src/app/services/ubicacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.css']
})
export class UbicacionComponent implements OnInit {
  ubicaciones: any[] = [];
  newUbicacion: any = {};
  editingUbicacion: any = null;
  error = '';

  constructor(private ubicacionService: UbicacionService, private router: Router) { }

  ngOnInit(): void {
    this.loadUbicaciones();
  }

  loadUbicaciones(): void {
    this.ubicacionService.getUbicaciones().subscribe(
      data => {
        this.ubicaciones = data;
      },
      err => {
        console.error('Error obteniendo ubicaciones:', err);
        this.error = 'Error en el servidor al obtener ubicaciones.';
      }
    );
  }

  createUbicacion(): void {
    this.ubicacionService.createUbicacion(this.newUbicacion).subscribe(
      data => {
        this.ubicaciones.push(data);
        this.newUbicacion = {};
        this.editingUbicacion = null;
      },
      err => {
        console.error('Error al añadir la ubicación:', err);
        this.error = 'Error en el servidor al añadir la ubicación.';
      }
    );
  }

  editUbicacion(ubicacion: any): void {
    this.editingUbicacion = { ...ubicacion };
  }

  updateUbicacion(ubi_id: number): void {
    this.ubicacionService.updateUbicacion(ubi_id, this.editingUbicacion).subscribe(
      data => {
        const index = this.ubicaciones.findIndex(u => u.ubi_id === ubi_id);
        if (index !== -1) {
          this.ubicaciones[index] = data;
        }
        this.editingUbicacion = null;
      },
      err => {
        console.error('Error actualizando ubicación:', err);
        this.error = 'Error en el servidor al actualizar ubicación.';
      }
    );
  }

  deleteUbicacion(ubi_id: number): void {
    if (ubi_id) {
      this.ubicacionService.deleteUbicacion(ubi_id).subscribe(
        data => {
          this.ubicaciones = this.ubicaciones.filter(u => u.ubi_id !== ubi_id);
        },
        err => {
          console.error('Error eliminando ubicación:', err);
          this.error = 'Error en el servidor al eliminar ubicación.';
        }
      );
    } else {
      console.error('ID de ubicación no válido:', ubi_id);
    }
  }

  cancelEdit(): void {
    this.editingUbicacion = null;
  }
}
