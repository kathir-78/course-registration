import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { ElectiveCourse } from '../../../models/model';

@Component({
  selector: 'app-course-registration',
  imports: [],
  templateUrl: './course-registration.component.html',
})

export class CourseRegistrationComponent implements OnInit{

  studentService = inject(StudentService);
  AvailableElectives = signal<ElectiveCourse []>([]);
  AvailableOpenElectives = signal<ElectiveCourse []>([]);

  ngOnInit() {
    this.onPageLoad();
  }

  onPageLoad() {
    this.studentService.getElegibleProfessionalElective()
    .subscribe({
       next: (response) => {
              console.log(response);
              this.AvailableElectives.set(response as ElectiveCourse [])
      },
      error: (err) => console.log(err)
    })

    this.studentService.getElegibleOptionalElective()
    .subscribe({
       next: (response) => {
              console.log(response);
              this.AvailableOpenElectives.set(response as ElectiveCourse [])
      },
      error: (err) => console.log(err)
    })
  }

  registerClick(electiveId: string | null, electiveType: string | null) {
    if(electiveType === 'professionalElective') {
      this.studentService.electiveRegister(electiveId)
      .subscribe({
        next: (response) => {
               console.log(response);
               this.onPageLoad();
       },
       error: (err) => console.log(err)
     })
    }
    else {
      this.studentService.openElectiveRegister(electiveId)
      .subscribe({
        next: (response) => {
               console.log(response);
               this.onPageLoad();
       },
       error: (err) => console.log(err)
     })
    }
  }

}
