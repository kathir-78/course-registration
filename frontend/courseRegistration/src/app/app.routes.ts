import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdmincreateComponent } from './components/admin/admincreate/admincreate.component';
import { ManagestudentComponent } from './components/admin/managestudent/managestudent.component';
import { ManageuserComponent } from './components/admin/manageuser/manageuser.component';
import { AdminstudentComponent } from './shared/adminstudent/adminstudent.component';
import { AdminuserComponent } from './shared/adminuser/adminuser.component';
import { StaffComponent } from './components/staff/staff.component';
import { AddCoursesComponent } from './components/staff/add-courses/add-courses.component';
import { RegisteredStudentComponent } from './components/staff/registered-student/registered-student.component';
import { ListCoursesComponent } from './components/staff/list-courses/list-courses.component';
import { CorecourseComponent } from './shared/corecourse/corecourse.component';
import { ElectiveCourseComponent } from './shared/elective-course/elective-course.component';
import { StudentComponent } from './components/student/student.component';
import { MyCourseComponent } from './components/student/my-course/my-course.component';
import { CourseRegistrationComponent } from './components/student/course-registration/course-registration.component';
import { authGuard } from './auth.guard';
import { ErrorComponent } from './shared/error/error.component';

export const routes: Routes = [
    {
        path: 'auth-login',
        component: LoginComponent,
    },

    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'admin',                                        // admin routes
                component: AdminComponent,
                data: {role: 'admin'},
                children: [
                    {
                        path: '',
                        component: AdmincreateComponent
                    },
                    {
                        path: 'manage/student',
                        component: ManagestudentComponent,
                    },

                    {
                        path: 'manage/student/:studentId',
                        component: AdminstudentComponent
                    },

                    {
                        path: 'manage/staff',
                        component: ManageuserComponent
                    },

                    {
                        path: 'manage/staff/:staffId',
                        component: AdminuserComponent
                    },
                ]
            },

            {
                path: 'staff',                                             // staff routes
                component: StaffComponent,
                data: {role: 'staff'},
                children : [
                    {
                        path:'',
                        component: AddCoursesComponent
                    },

                    {
                        path: 'courses',
                        component: ListCoursesComponent
                    },

                    {
                        path: 'courses/registered',
                        component: RegisteredStudentComponent
                    },

                    {
                        path: 'core/edit/:ccId',
                        component: CorecourseComponent
                    },

                    {
                        path: 'edit/:electiveType/:elId',
                        component: ElectiveCourseComponent
                    }
                ]
            },

            {                                                               // student routes
                path: 'course',
                component: StudentComponent,
                data: {role: 'student'},
                children: [

                    {
                        path: '',
                        component: MyCourseComponent
                    },

                    {
                        path: 'available-courses',
                        component: CourseRegistrationComponent
                    }
                ]
            },

            {
                path: '**',
                component: ErrorComponent
            }

        ],
    },

];
