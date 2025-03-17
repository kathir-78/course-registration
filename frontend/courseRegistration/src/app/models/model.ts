export interface Student {
    _id: string | null,
    firstName: string,
    lastName: string,
    email: string,
    department: string,
    user_id: string,
    role: string,
    year: string,
    semester: number
}


export interface User {
    _id: string | null,
    firstName: string,
    lastName: string,
    email: string,
    department: string,
    user_id: string,
    role: string,
}


export interface CoreCourse {
    _id: string | null,
    courseCode: string,
    courseName: string,
    description: string,
    department: string,
    semester: number,
    __t: string | null
}

export interface ElectiveCourse {
    _id: string | null,
    courseCode: string,
    courseName: string,
    description: string,
    department: string,
    semester: number,
    eligibleDepartments: string[],
    electiveType: string | null,
    __t: string | null
}

// for fetching user data to load on the ui
export interface loggedUser {
    firstName: string,
    lastName: string,
    role: 'admin' | 'staff' | 'student' ;
}

export interface GetElective {
    _id: string | null,
    courseCode: string,
    courseName: string,
    description: string,
    __t: string 
}

//get the registeredCourses for staff route
export interface GetRegisteredCourses {
    studentDetails: {
        user_id: string,
        firstName: string,
        lastName: string,
        email: string,
        semester: string,
        department: string
    },
    registeredCourses : [{
        courseCode: string,
        courseName: string,
        description: string
    }]
}