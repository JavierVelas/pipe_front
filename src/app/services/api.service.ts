import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000/';
  private productosUrl = `${this.baseUrl}/productos`;
  private ubicacionesUrl = `${this.baseUrl}/ubicaciones`;
 

  constructor(private http: HttpClient) { }

}
