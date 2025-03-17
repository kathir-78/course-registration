import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Student } from '../../../models/model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-managestudent',
  imports: [RouterLink],
  templateUrl: './managestudent.component.html'
})
export class ManagestudentComponent implements OnInit {

  adminService = inject(AdminService)
  studentData = signal<Student[]>([])

ngOnInit() {
  this.loadStudents();
}

loadStudents() {
  this.adminService.getStudents().subscribe({
    next: (response) => {
      console.log(response);
      this.studentData.set(response as Student[]);
    },
    error: (err) => {
      console.log(err.message);
    }
  });
}

onClick(id: string | null) {
  this.adminService.deleteStudent(id).subscribe({
    next: (response) => {
      console.log('Student deleted successfully:', response);
      this.loadStudents(); 
    },
    error: (err) => {
      console.log('Error deleting student:', err.message);
    }
  });
}

}
