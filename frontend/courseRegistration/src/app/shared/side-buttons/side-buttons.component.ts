import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from '../buttons/buttons.component';
import { AuthService } from '../../services/auth.service';
import { loggedUser } from '../../models/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-buttons',
  standalone: true,
  imports: [CommonModule, ButtonsComponent],
  template: `
  
  <div class="h-screen w-16 sm:w-24 md:w-48 lg:w-64 bg-gray-100 flex flex-col items-center py-4 space-y-2 fixed lg:relative transition-all duration-300 p-4 pt-10">
  <button class="lg:hidden p-2 text-gray-900" (click)="toggleSidebar()">
    ☰
  </button>

  <div [ngClass]="{ 'hidden': isCollapsed, 'block': !isCollapsed }" class="lg:block w-full">


  <!-- admin routes buttons -->
   @if(user()?.role === 'admin') {
     <h2 class="text-xl mb font-medium">Manage </h2>
     <app-buttons [route]="'/admin/'" [label]="'Create'"></app-buttons>
     <app-buttons [route]="'/admin/manage/student'" [label]="'Student'"></app-buttons>
     <app-buttons  [route]="'/admin/manage/staff'" [label]="'Staff'"></app-buttons>
    }

  <!-- staff routes buttons -->
   @else if(user()?.role === 'staff') {
     <h2 class="text-xl font-medium">Courses</h2>
     <app-buttons [route]="'/staff/courses'"    [label]="'Courses'"></app-buttons>
     <app-buttons [route]="'/staff'" [label]="'Add Courses'"></app-buttons>
     <app-buttons [route]="'/staff/courses/registered'" [label]="'Registered Student'"></app-buttons>
    }

  <!-- student routes buttons -->
   @else {
     <h2 class="text-xl font-medium">Courses</h2>
     <app-buttons [route]="'/course'"  [label]="'My Course'"></app-buttons>
     <app-buttons [route]="'/course/available-courses'"  [label]="'Available Courses'"></app-buttons>
    }
  
</div>
</div>

  `,
  styles: `button {
    transition: all 0.3s ease-in-out;
  }`
})
export class SideButtonsComponent implements OnInit, OnDestroy{

  isCollapsed = false;
  authService = inject(AuthService);
  user = signal<loggedUser | null>(null);
  private subscription: Subscription = new Subscription();


  ngOnInit(): void {
    this.subscription.add(
      this.authService.currentUser$.subscribe({
        next: (userData) => {
          this.user.set(userData);
        },
        error: (err) => console.log(err)
      })
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

}
