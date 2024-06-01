import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services-offered',
  templateUrl: './services-offered.component.html',
  styleUrls: ['./services-offered.component.css']
})
export class ServicesOfferedComponent implements OnInit {
  services = [
    {
      title: 'Paediatrician',
      description: 'Comprehensive care for infants, children, and adolescents.',
      image: 'assets/cross.png'
    },
    {
      title: 'Family Physician',
      description: 'General health care for all family members.',
      image: 'assets/doctor.png'
    },
    {
      title: 'Dermatologist',
      description: 'Expert care for skin conditions and diseases.',
      image: 'assets/dermatologist.png'
    },
    {
      title: 'Dietitian',
      description: 'Nutritional advice and diet plans for better health.',
      image: 'assets/dietitian.png'
    },
    {
      title: 'Physiotherapist',
      description: 'Rehabilitation services to improve movement and function.',
      image: 'assets/physiotherapist.png'
    },
    {
      title: 'Special Consultation',
      description: 'Expert consultations for specialized medical conditions.',
      image: 'assets/consultation.png'
    },
    {
      title: 'ECG Heart Test',
      description: 'Electrocardiogram tests to monitor heart health.',
      image: 'assets/ecg.png'
    },
    {
      title: 'Rapid Tests',
      description: 'Quick and accurate diagnostic tests.',
      image: 'assets/rapid-test.png'
    },
    {
      title: 'Cardiologist',
      description: 'Specialized care for heart and cardiovascular conditions.',
      image: 'assets/cardiologist.png'
    }
  ];

  currentPage = 1;
  itemsPerPage = 3;
  totalPages = Math.ceil(this.services.length / this.itemsPerPage);

  constructor() { }

  ngOnInit(): void { }

  get paginatedServices() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.services.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
