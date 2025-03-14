import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000/api'; // URL del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los feedback
  getFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/feedback`);
  }

  // Obtener un feedback por ID
  getFeedbackById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/feedback/${id}`);
  }

  // Crear un nuevo feedback
  createFeedback(feedback: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/feedback`, feedback);
  }

  // Actualizar un feedback existente
  updateFeedback(id: number, feedback: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/feedback/${id}`, feedback);
  }

  // Eliminar un feedback por ID
  deleteFeedback(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/feedback/${id}`);
  }
}
