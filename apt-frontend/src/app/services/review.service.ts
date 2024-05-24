import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = 'http://localhost:3000/api/v1/reviews'; // Adjust this URL according to your backend

  constructor(private http: HttpClient) {}

  getReviews(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getReviewById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createReview(review: any): Observable<any> {
    return this.http.post(this.apiUrl, review);
  }

  updateReview(id: number, review: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, review);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
