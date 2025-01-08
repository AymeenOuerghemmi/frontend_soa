import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  student: any = {
    firstName: '',
    lastName: '',
    email: '',
    addressId: null
  };

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.studentService.getStudentById(id).subscribe((data) => {
        this.student = data;
      });
    }
  }

  saveStudent(): void {
    if (this.student.id) {
      this.studentService.updateStudent(this.student.id, this.student).subscribe(() => {
        this.router.navigate(['/students']);
      });
    } else {
      this.studentService.createStudent(this.student).subscribe(() => {
        this.router.navigate(['/students']);
      });
    }
  }
}
