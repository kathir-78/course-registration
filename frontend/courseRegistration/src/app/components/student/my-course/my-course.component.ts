import { Component, inject, OnInit, signal } from '@angular/core';
import { StudentService } from '../../../services/student.service';
import { CoreCourse, GetElective } from '../../../models/model';

@Component({
  selector: 'app-my-course',
  imports: [],
  templateUrl: './my-course.component.html',
})

export class MyCourseComponent implements OnInit {

  studentService = inject(StudentService);
  coreCourses = signal<CoreCourse []>([]);
  electiveCourses = signal<GetElective []>([]);

  professionalElectives = () => this.electiveCourses().filter(c => c.__t === 'Elective');
  openElectives = () => this.electiveCourses().filter(c => c.__t === 'OpenElective');

  ngOnInit(): void {
    this.studentService.getCoreCourse()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.coreCourses.set(response as CoreCourse [])
      },
      error: (err) => console.log(err)
    })

    this.studentService.getRegisteredElectives()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.electiveCourses.set(response as GetElective [])
      },
      error: (err) => console.log(err)
    })

  }

}
