import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Student, User } from '../models/model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private URL = environment.apiUrl;
  
  constructor(private http: HttpClient, private route: Router) {}

  //student 
  getStudents() {
    return this.http.get(this.URL + '/user/student')
  }

  getStudent(id: string | null) : Observable<Student> {
    return this.http.get<Student>(this.URL + '/user/student/' + id)
  }

  addStudent(studentData: Student) { 
   return this.http.post(this.URL+ '/user/student', studentData)
  }

  updateStudent(id: string | null, studentData: Student) { 
    const {firstName, lastName, department, year, semester} = studentData;
    return this.http.patch(this.URL + '/user/student/' + id, {firstName, lastName, department, year, semester} )
  }

  deleteStudent(id: string | null) : Observable<any> {
    return this.http.delete(this.URL + '/user/student/' + id)
  }

  //user = staff not admin
  getUsers() {
    return this.http.get(this.URL + '/user/staff' )
  }

  //get by + id
  getUser(id:string | null) {  
     return this.http.get(this.URL + '/user/staff/' + id);
  }

  addUser(userData: User) {
     return this.http.post(this.URL+ '/user/staff', userData)
   }

   updateUser(id: string | null, userData: User) {
    const {firstName, lastName, department} = userData
    return this.http.patch(this.URL+ '/user/staff/'+ id, {firstName, lastName, department})
   }

   deleteUser(id: string | null) {
    return this.http.delete(this.URL+ '/user/staff/' + id)
   }
}
