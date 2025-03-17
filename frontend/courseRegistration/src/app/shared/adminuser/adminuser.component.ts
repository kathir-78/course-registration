import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../models/model';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-adminuser',
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInput, MatIconModule, MatButtonModule, MatSelectModule],
  templateUrl: './adminuser.component.html',
})
export class AdminuserComponent implements OnInit {

  constructor(private actroute: ActivatedRoute, private router: Router) {}

  adminService  = inject(AdminService);
  userForm!: FormGroup;
  mode: string = '';
  staffId: string | null = '';

  ngOnInit() {   
    this.userForm = new FormGroup ({
      firstName : new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      department: new FormControl('', Validators.required),
      user_id: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    })

    this.actroute.paramMap.subscribe({
      next: (paramas) => {
        if (paramas.has('staffId')) {
          this.mode = 'edit';
          this.staffId = paramas.get('staffId');
          this.adminService.getUser(this.staffId).subscribe({
            next : (response) => {
              const user = response as User;
              this.userForm.setValue({
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  department: user.department,
                  user_id: user.user_id,
                  role: user.role
                });
            },
            error :(err) => console.log(err)
          })
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addUser() {
    if(this.userForm.valid) {

      if(this.mode === 'edit') {
        this.adminService.updateUser(this.staffId ,this.userForm.value).subscribe({
          next: (response) => {
            this.router.navigate(['/admin/manage/staff']);
            console.log(response);
          },
          error: (err) => {
            console.log(err.error);
          }
        })
      }
      else {
        this.adminService.addUser(this.userForm.value as User).subscribe({
          next: (response) => {
            this.router.navigate(['/admin/manage/staff']);
            console.log(response);
          },
          error: (err) => {
            console.log(err.error);
          }
        })
      }
      console.log(this.userForm.value);
      this.userForm.reset();
    }
  } 
}
  