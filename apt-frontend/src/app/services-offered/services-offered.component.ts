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
      image: 'assets/images/service-paediatrician.jpg'
    },
    {
      title: 'Family Physician',
      description: 'General health care for all family members.',
      image: 'assets/images/service-family-physician.jpg'
    },
    {
      title: 'Dermatologist',
      description: 'Expert care for skin conditions and diseases.',
      image: 'assets/images/service-dermatologist.jpg'
    },
    {
      title: 'Dietitian',
      description: 'Nutritional advice and diet plans for better health.',
      image: 'assets/images/service-dietitian.jpg'
    },
    {
      title: 'Physiotherapist',
      description: 'Rehabilitation services to improve movement and function.',
      image: 'assets/images/service-physiotherapist.jpg'
    },
    {
      title: 'Special Consultation',
      description: 'Expert consultations for specialized medical conditions.',
      image: 'assets/images/service-special-consultation.jpg'
    },
    {
      title: 'ECG Heart Test',
      description: 'Electrocardiogram tests to monitor heart health.',
      image: 'assets/images/service-ecg-heart-test.jpg'
    },
    {
      title: 'Rapid Tests',
      description: 'Quick and accurate diagnostic tests.',
      image: 'assets/images/service-rapid-tests.jpg'
    },
    {
      title: 'Cardiologist',
      description: 'Specialized care for heart and cardiovascular conditions.',
      image: 'assets/images/service-cardiologist.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
