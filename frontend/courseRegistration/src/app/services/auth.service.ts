import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, tap } from 'rxjs';
import { loggedUser } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<loggedUser | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private isInitialized = new BehaviorSubject<boolean>(false);
  isInitialized$ = this.isInitialized.asObservable();

  constructor(private http: HttpClient, private route: Router) {}

  // fetch the user data while cookies are in the browser
  initializeAuth(shouldRedirect: boolean = false) {
    return this.http.get<loggedUser>(`${this.URL}/auth/user`, { withCredentials: true }).pipe(
      tap(user => {
        console.log("User initialized:");
        this.currentUserSubject.next(user);
        this.isInitialized.next(true);
        if(shouldRedirect) {
          this.redirectUser(user.role);  // Redirect after fetching user
        }
      })
    ).subscribe({
      error: () => {
        this.currentUserSubject.next(null);
        this.isInitialized.next(true);
      }
    });
  }

  loginUser(email: any) {
    this.http.post<{message: string}>(this.URL + '/auth/login', {email}, {withCredentials: true}).subscribe({
      next: (response) => {
        console.log(response.message);
        this.initializeAuth(true);
      },
      error: (err) => {
        console.error('Login failed', err.message) }
    })
  }

  logOut() {
     this.http.post(this.URL + '/auth/logout', {},  {withCredentials: true})
     .subscribe({
      next : (response) =>{
        console.log(response);
        this.route.navigate(['/auth-login']);
        console.log('Logout successful');
        this.currentUserSubject.next(null);
      } ,
      error: (err) => {
        console.log(err);
      }
    })
  }

 redirectUser(role: string) {
    const defaultRoute = this.getDefaultRoute(role);
    this.route.navigate([defaultRoute]);  
  }
  
  getDefaultRoute(role: string): string {
    switch (role) {
      case 'admin': return '/admin';
      case 'staff': return '/staff';
      case 'student': return '/course';
      default: return '/auth-login';
    }
  }
}
