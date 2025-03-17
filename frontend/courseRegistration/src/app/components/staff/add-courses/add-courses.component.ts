import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CorecourseComponent } from '../../../shared/corecourse/corecourse.component';
import { ElectiveCourseComponent } from '../../../shared/elective-course/elective-course.component';

@Component({
  selector: 'app-add-courses',
  imports: [MatCardModule, MatButtonModule, CorecourseComponent, ElectiveCourseComponent],
  templateUrl: './add-courses.component.html',
})
export class AddCoursesComponent {
   isCoreCourse = false;
   isElectiveCourse = false;

   onCoreClicked() {
    this.isCoreCourse = true;
    this.isElectiveCourse = false
   }

   onElectiveClicked() {
    this.isElectiveCourse = true;
    this.isCoreCourse = false;
   }
}
