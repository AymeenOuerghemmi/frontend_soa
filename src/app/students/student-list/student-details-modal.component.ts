import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-student-details-modal',
  templateUrl: './student-details-modal.component.html',
  styleUrls: ['./student-details-modal.component.css']
})
export class StudentDetailsModalComponent implements OnInit {
  @Input() studentDetails: any;
  @Input() addressDetails: any;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    // Assurez-vous que les valeurs par défaut sont définies si les données sont manquantes
    this.studentDetails = this.studentDetails || {
      firstName: 'N/A',
      lastName: 'N/A',
      email: 'N/A',
      addressId: null
    };

    this.addressDetails = this.addressDetails || {
      street: 'N/A',
      city: 'N/A'
    };
  }
}
