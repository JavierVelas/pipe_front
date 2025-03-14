import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  constructor(private http: HttpClient) { }

   // Obtener todos los ubicación
   getUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/ubicacion`);
   }
 
      // Obtener un ubicación por ID
    getUbicacionById(id: number): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/ubicacion/${id}`);
    }
  
    // Crear una nueva ubicación
    createUbicacion(ubicacion: any): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/ubicacion`, ubicacion);
    }
  
    // Actualizar una ubicación existente
    updateUbicacion(id: number, ubicacion: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/ubicacion/${id}`, ubicacion);
    }
  
    // Eliminar una ubicación por ID
    deleteUbicacion(id: number): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/ubicacion/${id}`);
    }

 


}


