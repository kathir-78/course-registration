import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonsComponent } from '../shared/buttons/buttons.component';
import { SideButtonsComponent } from '../shared/side-buttons/side-buttons.component';
import { AuthService } from '../services/auth.service';
import { loggedUser } from '../models/model';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, ButtonsComponent, SideButtonsComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {

  authService = inject(AuthService);
  user = signal<loggedUser | null>(null)
  
  ngOnInit(): void {
    this.authService.currentUser$.subscribe({
      next: (userData) => {
        this.user.set(userData);
      },
      error: (err) => console.log(err)
    })
  }

  clickedLogOut() {
    console.log('loguoutclicked');
    this.authService.logOut()
  }

}
