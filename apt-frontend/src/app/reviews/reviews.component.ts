import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewService } from '../services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  review = {
    name: '',
    rating: null,
    comment: ''
  };

  ratings = [1, 2, 3, 4, 5];

  constructor(private reviewService: ReviewService, private router: Router) {}

  onSubmit(): void {
    this.reviewService.createReview(this.review).subscribe(
      (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted',
          text: 'Your review has been successfully submitted!',
          showConfirmButton: false,
          timer: 1500
        });

        this.review = {
          name: '',
          rating: null,
          comment: ''
        };
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: error.error.message || 'Unable to submit the review. Please try again.'
        });
      }
    );
  }
}
