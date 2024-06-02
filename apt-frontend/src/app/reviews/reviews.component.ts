import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import Swal from 'sweetalert2';

interface Review {
  id?: number;
  customer_name: string;
  occupation: string;
  review_message: string;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = [];
  review: Review = {
    customer_name: '',
    occupation: '',
    review_message: ''
  };

  constructor(private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.getReviews().subscribe(
      data => {
        this.reviews = data;
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load reviews!'
        });
      }
    );
  }

  onSubmit(): void {
    this.reviewService.createReview(this.review).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Review submitted',
          text: 'Thank you for your feedback!'
        });
        this.getReviews();
        this.review = {
          customer_name: '',
          occupation: '',
          review_message: ''
        };
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to submit review!'
        });
      }
    );
  }
}
