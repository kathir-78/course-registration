# 🎓 Course Registration

A web-based **Course Registration System** where **Students** can log in using **Google Sign-In (GSI)** and register for **Elective** and **Open Elective** courses based on their department eligibility. **Staff** can manage courses and view registered students, while the **Admin** manages users. 

## 🚀 Features
- **Google Sign-In (GSI)** authentication
- **Role-based access** (Student, Staff, Admin)
- **JWT authentication with cookies**
- **Authorization for each route**
- **RESTful API with Node.js & Express**
- **Validation in both Frontend and Backend**
- **Api level validation and schema level validation**
- **MongoDB database integration**
- **AWS Deployment: Hosted on an AWS EC2 instance**

## 🛠️ Technologies Used
### **Frontend (Angular)**
- Angular 19
- Tailwind CSS
- Google OAuth (GSI)
- Angular Material

### **Backend (Node.js & Express)**

- Node.js & Express.js
- MongoDB with Mongoose (ODM)
- JSON Web Tokens (JWT)
- Google OAuth API
- CORS 


## 🔒 Security Features

### Frontend Route Protection
- **Angular Route Guards**: Restrict access to protected routes.
- Once logged in, users can access other routes based on their role.

### Backend Security
- **JWT Authentication**: Users must be logged in to access APIs.
- **Role-Based Access Control (RBAC)**:
  - **Student**: Can only register for courses in their department.
  - **Staff**: Can view the registered students in their department and also add/remove/edit/delet the courses.
  - **Admin**: Manages the Users like Student and the Staff.

## 🌐 Deployment

The project is deployed on an **AWS EC2 Instance** with the following setup:
- **Frontend**: Hosted using NGINX.
- **Backend**: Running on Node.js with PM2 for process management (24/7).
- **Database**: MongoDB Atlas (cloud-hosted).


### Steps to Access:
1. Live URL [http://51.21.210.241](http://51.21.210.241)
2. Log in using **Google Sign-In (GSI)** to access the system.

## 📜 License
This project is licensed under the [MIT License](LICENSE).
