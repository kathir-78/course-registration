import { Component } from '@angular/core';
import { AdminuserComponent } from "../../../shared/adminuser/adminuser.component";
import { AdminstudentComponent } from "../../../shared/adminstudent/adminstudent.component";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admincreate',
  imports: [CommonModule,
      MatButtonModule, 
      MatCardModule, 
      MatFormFieldModule,
      MatInputModule, AdminuserComponent, AdminstudentComponent],
  templateUrl: './admincreate.component.html',
})
export class AdmincreateComponent {

  isStudent: boolean = false;
  isUser: boolean = false;

  onStudentClicked() {
    this.isStudent = true;
    this.isUser = false;
  }

  onUserClicked() {
    this.isUser = true;
    this.isStudent = false;
  }
}
