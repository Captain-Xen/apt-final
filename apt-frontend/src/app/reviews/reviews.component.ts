// reviews.component.ts
import { Component } from '@angular/core';
import { ReviewService } from '../services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  review = {
    customer_name: '',
    occupation: '',
    review_message: ''
  };

  constructor(private reviewService: ReviewService) {}

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
          customer_name: '',
          occupation: '',
          review_message: ''
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

