import { Component, inject, OnInit, signal } from '@angular/core';
import { StaffService } from '../../../services/staff.service';
import { CoreCourse, ElectiveCourse } from '../../../models/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-courses',
  imports: [RouterLink],
  templateUrl: './list-courses.component.html',
})

export class ListCoursesComponent implements OnInit{

  staffService = inject(StaffService);

  Courses = signal<Array<CoreCourse | ElectiveCourse>>([]);

 
  ngOnInit(): void {
    this.loadCourses()
  }

  loadCourses() {
    this.staffService.getCourses()
    .subscribe({
      next: (response) => {
        console.log(response);
        this.Courses.set(response.courses as Array<CoreCourse | ElectiveCourse>) 
      },
      error: (err) => console.log(err)
    })
  }

  onDelete(courseType: string, id: string | null) {
    this.staffService.deleteCourse(courseType, id)
    .subscribe({
      next: (response) => {
        console.log(response);
        this.loadCourses();
      },
      error: (err) => console.log(err)
    })
  }
}
