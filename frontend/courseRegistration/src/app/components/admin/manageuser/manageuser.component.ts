import { Component, inject, OnInit, signal } from '@angular/core';
import { User } from '../../../models/model';
import { AdminService } from '../../../services/admin.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-manageuser',
  imports: [RouterLink],
  templateUrl: './manageuser.component.html',
})
export class ManageuserComponent implements OnInit {

  userData = signal<User[]>([]); 
  adminService = inject(AdminService);

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.adminService.getUsers().subscribe({
      next: (response) => {
        console.log(this.userData());
        this.userData.set(response as User[])
        console.log(this.userData());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onClick(id: string | null) {
    this.adminService.deleteUser(id).subscribe({
      next: (response) => {
        console.log(response);
        this.loadUser();
      },
      error: (err) => {
        console.log(err.message);
      }
    })
  }
  
}
