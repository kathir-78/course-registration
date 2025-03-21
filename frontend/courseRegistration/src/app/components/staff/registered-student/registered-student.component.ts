import { Component, inject, signal } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { FormsModule, NgModel } from '@angular/forms';
import { GetRegisteredCourses } from '../../../models/model';

@Component({
  selector: 'app-registered-student',
  imports: [FormsModule],
  templateUrl: './registered-student.component.html',
})

export class RegisteredStudentComponent {

  semester!: number;
  staffService = inject(StaffService);
  registeredElectiveStudents = signal<GetRegisteredCourses []>([]);

  onSubmit() {
    if(this.semester) {
      this.staffService.getElectiveRegistered(this.semester)
      .subscribe({
        next: (respose) => {
          console.log(respose);
          this.registeredElectiveStudents.set(respose as GetRegisteredCourses [])
        }, 
        error: (err) => console.log(err)
      })
    }
  }
}
