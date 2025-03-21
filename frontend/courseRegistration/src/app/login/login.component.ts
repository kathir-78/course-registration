import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  authService = inject(AuthService)
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.email, Validators.required]})
  })

  onSubmit() {
    if(this.form.valid) 
    {
      this.authService.loginUser(this.form.value.email)
    }
  }

  logout() {
    this.authService.logOut();
  }
}
