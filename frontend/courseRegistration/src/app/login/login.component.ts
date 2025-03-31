import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

declare const google: any;
const CLIENT_ID = environment.CLIENT_ID;

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit, AfterViewInit {

  
  authService = inject(AuthService)
  form = new FormGroup({
    email: new FormControl('', { validators: [Validators.email, Validators.required]})
  })

  ngOnInit() {
    try {
      google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response: any) => this.handleGoogleSignIn(response),
        auto_select: false,
      });
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
    }
  }

  ngAfterViewInit() {
    const googleButtonContainer = document.getElementById('google-button-container');
    if (googleButtonContainer) {
      googleButtonContainer.innerHTML = '';

      google.accounts.id.renderButton(
        googleButtonContainer,
        {
          type: 'standard',
          size: 'medium',
          theme: 'outline',
          text: 'signin_with',
          shape: 'circle',
          logo_alignment: 'center',
        }
      );
    } else {
      console.error('Google button container not found');
    }
  }

  handleGoogleSignIn(response: any) {
    if (response.credential) {
      // console.log(response);    // response will get the client_id, clientID and credential
      this.authService.loginWithGoogle(response.credential);
    }
  }

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
