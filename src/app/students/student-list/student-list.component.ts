import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { HttpClient } from '@angular/common/http'; 
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { StudentDetailsModalComponent } from './student-details-modal.component';  
import Swal from 'sweetalert2'; // Importer SweetAlert2

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = [];
  studentDetails: any; 
  addressDetails: any;

  constructor(
    private modalService: NgbModal,
    private studentService: StudentService,
    private http: HttpClient 
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.studentService.getAllStudents().subscribe((data: any[]) => {
      this.students = data;
    });
  }

  deleteStudent(id: number): void {
    // Afficher la confirmation SweetAlert avant de supprimer
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe(
          () => {
            console.log('Student deleted successfully');
            Swal.fire(
              'Deleted!',
              'The student has been deleted.',
              'success'
            );
            // Rafraîchir la liste des étudiants après suppression
            this.loadStudents();
          },
          (error: any) => {
            console.error('There was an error!', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the student.',
              'error'
            );
          }
        );
      }
    });
  }

  viewDetails(id: number): void {
    this.http.get(`http://localhost:8081/api/students/${id}/details`).subscribe(
      (data: any) => {
        this.studentDetails = data.studentDetails;  
        this.addressDetails = data.addressDetails;  
        console.log('Student details:', this.studentDetails);
        console.log('Address details:', this.addressDetails);

        const modalRef = this.modalService.open(StudentDetailsModalComponent);
        modalRef.componentInstance.studentDetails = this.studentDetails;
        modalRef.componentInstance.addressDetails = this.addressDetails;
      },
      (error) => {
        console.error('There was an error fetching student details!', error);
      }
    );
  }
}
