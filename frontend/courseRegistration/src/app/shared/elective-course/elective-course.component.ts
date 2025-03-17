import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { StaffService } from '../../services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectiveCourse } from '../../models/model';

@Component({
  selector: 'app-elective-course',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatOption, MatSelect, MatButtonModule, MatCheckboxModule],
  templateUrl: './elective-course.component.html',
})

export class ElectiveCourseComponent implements OnInit{

  constructor(private actroute: ActivatedRoute, private route: Router) {}
  electiveCourse!: FormGroup;
  departments = ['CSE', 'IT', 'ECE', 'EEE', 'ME', 'MC'];
  staffService = inject(StaffService);
  mode:string | null = '';
  electiveCourseId:string | null ='';
  elctiveType:string | null = '';

  ngOnInit(): void {
    this.electiveCourse = new FormGroup({
      courseCode: new FormControl('', Validators.required),
      courseName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      semester: new FormControl <number | null> (null,Validators.required),
      eligibleDepartments: new FormControl([], Validators.required),
      electiveType : new FormControl('')
    })

    this.actroute.paramMap.subscribe({
      next: (params) =>
      {
        if(params.has('elId') && params.has('electiveType')) {
          this.mode = 'edit';
          this.electiveCourseId = params.get('elId');
          this.elctiveType = params.get('electiveType')
          this.staffService.getElectiveCourse(this.elctiveType, this.electiveCourseId)
          .subscribe({
            next: (response) => {
              console.log(response);
              const elective = response as ElectiveCourse
              this.electiveCourse.setValue({electiveType: this.elctiveType,
                courseCode: elective.courseCode,
                courseName: elective.courseName,
                description: elective.description,
                department: elective.department,
                semester: elective.semester,
                eligibleDepartments : elective.eligibleDepartments
              }) 
            },
            error: (err) => {
              console.log(err);
            }
          })
        }
      },
      error: (err) => console.log(err)
    })

  }


  onDepartmentToggle(dept: string, isChecked: boolean) {
    const departments = this.electiveCourse.get('eligibleDepartments')?.value as string[];
    
    if (isChecked) {
      departments.push(dept);
    } else {
      const index = departments.indexOf(dept);
      if (index > -1) departments.splice(index, 1);
    }
    
    this.electiveCourse.get('eligibleDepartments')?.setValue(departments);
  }


  onSubmit() {
    if(this.electiveCourse.valid) {
      if(this.mode === 'edit') {
        this.staffService.updateElectiveCourse(this.elctiveType, this.electiveCourseId, this.electiveCourse.value)
        .subscribe({
          next: (response) => {
            console.log(response);
            console.log(response.data);
            this.route.navigate(['/staff/courses'])
          },
          error: (err) => console.log(err)
        })
      }
      else {
        this.staffService.addElectiveCourse(this.electiveCourse.value).subscribe({
          next: (response) => { console.log(response)
          this.route.navigate(['/staff/courses'])},
          error: (err) => console.log(err)
        })
      }
    }
    }
}
