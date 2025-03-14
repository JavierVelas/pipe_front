import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  feedbacks: any[] = [];
  newFeedback: any = {};
  editingFeedbacks: any = null;
  error = '';

  private apiUrl = 'http://localhost:3000/api/feedback';

  constructor(
    private feedbackService: FeedbackService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      data => {
        this.feedbacks = data;
      },
      err => {
        console.error('Error obteniendo feedbacks:', err);
        this.error = 'Error en el servidor al obtener feedbacks.';
      }
    );
  }

  createFeedback(): void {
    this.feedbackService.createFeedback(this.newFeedback).subscribe(
      data => {
        this.feedbacks.push(data);
        this.newFeedback = {};
        this.router.navigate(['feedback']); // Navegar a la lista de ubicaciones después de crear
      },
      err => {
        console.error('Error creando feedbacks:', err);
        this.error = 'Error en el servidor al crear feedbacks.';
      }
    );
  }

  editFeedback(feedback: any): void {
    this.editingFeedbacks = { ...feedback };
  }

  updateFeedback(): void {
    this.feedbackService.updateFeedback(this.editingFeedbacks.fb_id, this.editingFeedbacks).subscribe(
      data => {
        const index = this.feedbacks.findIndex(u => u.fb_id === this.editingFeedbacks.fb_id);
        if (index !== -1) {
          this.feedbacks[index] = data;
        }
        this.editingFeedbacks = null;
        this.router.navigate(['feedback']); // Navegar a la lista de ubicaciones después de actualizar
      },
      err => {
        console.error('Error editando ubicación:', err);
        this.error = 'Error en el servidor al editar ubicación.';
      }
    );
  }

  deleteFeedback(fb_id: number): void {
    if (fb_id) {
      this.feedbackService.deleteFeedback(fb_id).subscribe(
        data => {
          this.feedbacks = this.feedbacks.filter(u => u.fb_id !== fb_id);
          this.router.navigate(['feedback']); // Navegar a la lista de feedback después de eliminar
        },
        err => {
          console.error('Error eliminando feedback:', err);
          this.error = 'Error en el servidor al eliminar feedback.';
        }
      );
    } else {
      console.error('ID de ubicación no válido:', fb_id);
    }
  }

  cancelEdit(): void {
    this.editingFeedbacks = null;
  }

}
