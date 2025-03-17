import { Component, inject, NgModule, signal } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-registered-student',
  imports: [FormsModule],
  templateUrl: './registered-student.component.html',
})

export class RegisteredStudentComponent {

  semester?: number;
  staffService = inject(StaffService);
  registeredElectiveStudents = signal([]);

  onSubmit() {
    if(this.semester) {
      this.staffService.getElectiveRegistered(this.semester)
      .subscribe({
        next: (respose) => {
          console.log(respose);
          this.registeredElectiveStudents.set(respose as [])
        }, 
        error: (err) => console.log(err)
      })
    }
  }
}
