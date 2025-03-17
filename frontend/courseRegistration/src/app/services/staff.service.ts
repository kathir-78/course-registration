import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CoreCourse, ElectiveCourse } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  URL = environment.apiUrl;
  constructor(private http: HttpClient) {}
    
  // all courses
  getCourses() {
    return this.http.get<{message: string, courses: CoreCourse []}>(this.URL + '/course')
  }

  // add coreCourse
  addCoreCourse(coreCourse: CoreCourse) {
    return this.http.post(this.URL + '/course/core', coreCourse)
  }

  // get core course
  getCoreCourse(id: string | null) {
    return this.http.get(this.URL + '/course/core/' + id)
  }
  
  // updateCoreCourse
  updateCoreCourse(id: string | null, coreCourse: CoreCourse) {
    const { courseName, description, department, semester } = coreCourse;
    return this.http.patch<{message: string, data: CoreCourse}>( this.URL + '/course/core/' + id, { courseName, description, department, semester })
  }

  // delete courses based on course type
  deleteCourse(courseType: string, id: string | null) {
    return this.http.delete(this.URL + '/course/' + courseType + '/' + id)
  }

  //electivecourse
  addElectiveCourse(Elcourse: ElectiveCourse) {
    const {courseCode, courseName, description, department, semester, eligibleDepartments, electiveType} = Elcourse;
    return this.http.post(this.URL + '/course/' + electiveType, {courseCode, courseName, description, department, semester, eligibleDepartments})
  }

  // get elective course 
  getElectiveCourse(electiveType: string | null, id: string | null) {
    return this.http.get(this.URL + '/course/' + electiveType + '/' + id)
  }

  // update elective course
  updateElectiveCourse(electiveType: string | null, id: string | null, electiveData: ElectiveCourse) {
    const { courseName, description, department, semester, eligibleDepartments } = electiveData;
    return this.http.patch<{message: string, data: ElectiveCourse}>(this.URL + '/course/' + electiveType + '/' + id, { courseName, description, department, semester, eligibleDepartments })
  }

  //get registered student
  getElectiveRegistered(semester: number) {
    return this.http.get(`${this.URL}/courses/registered?semester=${semester}`)
  }

}
