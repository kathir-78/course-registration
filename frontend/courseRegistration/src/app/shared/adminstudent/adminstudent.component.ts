import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { AdminService } from '../../services/admin.service';
import { Student } from '../../models/model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-adminstudent',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInput, MatIconModule, MatButtonModule, MatSelectModule],
  templateUrl: './adminstudent.component.html',
})
export class AdminstudentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {}

  adminService  = inject(AdminService);
  studentForm ! :FormGroup;
  mode:string = 'create';
  studentId: string | null = '';

  ngOnInit() {
    this.studentForm = new FormGroup ({
      firstName : new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', Validators.required),
      user_id: new FormControl('', Validators.required),
      role: new FormControl('student', { nonNullable: true }),
      year: new FormControl('', Validators.required),
      semester: new FormControl <number | null>(null),
    })

    this.route.paramMap.subscribe({
      next : (paramMap) => {
        if(paramMap.has('studentId')) {
          this.mode = 'edit';
          this.studentId = paramMap.get('studentId');
          this.adminService.getStudent(this.studentId).subscribe({
            next : (response: Student) => {
              console.log(response);
              this.studentForm.setValue({
                firstName: response.firstName,
                lastName: response.lastName,
                email: response.email,
                department: response.department,
                user_id: response.user_id,
                role: 'student',
                year: response.year,
                semester: response.semester
              })
            },
            error: (err) => console.log(err)
          })
        }
      }, 
      error: (err) => console.log(err)
    })
  }



  addStudent() {
    if(this.studentForm.valid) {

      if(this.mode === 'edit') {
        this.adminService.updateStudent(this.studentId,this.studentForm.value).subscribe({
              next : (response) => {
                this.router.navigate(['/admin/manage/student']);
                console.log(response);
              },
              error: (err) => {
                console.log(err.error);
              }
            })
      }
      else {
        this.adminService.addStudent(this.studentForm.value as Student).subscribe({
              next: (response) => {
                this.router.navigate(['/admin/manage/student']);
                console.log(response);
              },
              error: (err) => {
                console.log(err.error);
              }
            })
      }
      console.log(this.studentForm.value);
      this.studentForm.reset();
    }
  }

}
