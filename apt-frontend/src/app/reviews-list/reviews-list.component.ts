import { Component, OnInit } from '@angular/core';
import { ReviewService } from '../services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews-list',
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit {
  reviews: any[] = [];
  isEditing: boolean = false;
  reviewForm: any = {
    id: null,
    customer_name: '',
    occupation: '',
    review_message: ''
  };

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.loadReviews();
  }

  loadReviews(): void {
    this.reviewService.getReviews().subscribe(
      (data: any[]) => {
        this.reviews = data;
      },
      (error) => {
        console.error('Error fetching reviews', error);
      }
    );
  }

  createReview(): void {
    Swal.fire({
      title: 'Add Review',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Customer Name">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Occupation">' +
        '<textarea id="swal-input3" class="swal2-input" placeholder="Review Message"></textarea>',
      focusConfirm: false,
      preConfirm: () => {
        return {
          customer_name: (document.getElementById('swal-input1') as HTMLInputElement).value,
          occupation: (document.getElementById('swal-input2') as HTMLInputElement).value,
          review_message: (document.getElementById('swal-input3') as HTMLInputElement).value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewService.createReview(result.value).subscribe(
          () => {
            this.loadReviews();
            Swal.fire('Created!', 'The review has been added.', 'success');
          },
          (error) => {
            console.error('Error creating review', error);
            Swal.fire('Error!', 'There was an error adding the review.', 'error');
          }
        );
      }
    });
  }

  editReview(id: number): void {
    const review = this.reviews.find(r => r.id === id);
    this.isEditing = true;
    this.reviewForm = { ...review };

    Swal.fire({
      title: 'Edit Review',
      html:
        `<input id="swal-input1" class="swal2-input" value="${review.customer_name}" placeholder="Customer Name">` +
        `<input id="swal-input2" class="swal2-input" value="${review.occupation}" placeholder="Occupation">` +
        `<textarea id="swal-input3" class="swal2-input" placeholder="Review Message">${review.review_message}</textarea>`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          id: review.id,
          customer_name: (document.getElementById('swal-input1') as HTMLInputElement).value,
          occupation: (document.getElementById('swal-input2') as HTMLInputElement).value,
          review_message: (document.getElementById('swal-input3') as HTMLInputElement).value
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewService.updateReview(id, result.value).subscribe(
          () => {
            this.loadReviews();
            Swal.fire('Updated!', 'The review has been updated.', 'success');
          },
          (error) => {
            console.error('Error updating review', error);
            Swal.fire('Error!', 'There was an error updating the review.', 'error');
          }
        );
      }
    });
  }
  deleteReview(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this review!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reviewService.deleteReview(id).subscribe(
          () => {
            this.loadReviews();
            Swal.fire('Deleted!', 'The review has been deleted.', 'success');
          },
          (error) => {
            console.error('Error deleting review', error);
            Swal.fire('Error!', 'There was an error deleting the review.', 'error');
          }
        );
      }
    });
  }
}
