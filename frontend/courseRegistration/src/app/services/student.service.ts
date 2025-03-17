import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private URL = environment.apiUrl;
  constructor(private http: HttpClient) { } 


  // list department courses to the student
  getCoreCourse() {
    return this.http.get(this.URL + "/courses/core")
  }


  // get the registered electives and open electives
  getRegisteredElectives() {
    return this.http.get(this.URL + '/courses/registered/electives')
  }


  // shows available courses department eligible like elective and open elective
  getElegibleProfessionalElective() {
    return this.http.get( this.URL + '/courses/elective')
  }

  getElegibleOptionalElective() {
    return this.http.get( this.URL + '/courses/openElective')
  }


  // register the elective courses
  electiveRegister(id: string | null) {
    return this.http.post(this.URL + '/course/register/elective/' + id, id )
  }

  openElectiveRegister(id: string | null) {
    return this.http.post(this.URL + '/course/register/openElective/' + id, id )
  }

}
