import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { StaffService } from '../../services/staff.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-corecourse',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatOption, MatSelect, MatButtonModule],
  templateUrl: './corecourse.component.html',
})
export class CorecourseComponent implements OnInit{

  constructor(private actroute: ActivatedRoute, private route: Router) {}
  coreCourseForm!: FormGroup;
  staffService = inject(StaffService);
  courseCodeId: string | null =''; 
  mode: string | null = '';

  ngOnInit(): void {
    this.coreCourseForm = new FormGroup({
      courseCode : new FormControl('', [Validators.required]),
      courseName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      department: new FormControl('', [Validators.required]),
      semester: new FormControl <number | null> (null, Validators.required)
    })

    this.actroute.paramMap.subscribe({
      next : (params) => {
        if(params.has('ccId')) {
          this.mode = 'edit';
          this.courseCodeId =  params.get('ccId');
          this.staffService.getCoreCourse(this.courseCodeId)
          .subscribe({
            next: (response) => {
              console.log(response);
              this.coreCourseForm.setValue(response)
            },
            error: (err) => console.log(err)
          })
        }
      },
      error: (err) => console.log(err)
    })
  }


  onClick() {
    if(this.coreCourseForm.valid) {
      if(this.mode === 'edit') {
        this.staffService.updateCoreCourse(this.courseCodeId, this.coreCourseForm.value)
        .subscribe({
          next : (response) => {
            console.log(response.message);
            console.log(response.data);
            this.route.navigate(['/staff/courses']);
          },
          error: err => console.log(err)
        })
      }
      else {
        this.staffService.addCoreCourse(this.coreCourseForm.value)
        .subscribe({
          next: (response) => {
            this.route.navigate(['/staff/courses']);
            console.log(response);
          },
          error: (err) => console.log(err)
        })
      }
    }
  }
}
