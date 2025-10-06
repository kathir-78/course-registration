# 🎓 Course Registration

A web-based Course Registration System where Students can sign in with Google Sign-In (GSI) and register for Elective and Open Elective courses. Staff can manage courses and view registered students, while the Admin manages users.

## 🚀 Features
- Google Sign-In (GSI) authentication
- Role-based access (Student, Staff, Admin)
- JWT authentication with cookies
- Authorization on each backend route
- RESTful API with Node.js & Express
- Validation on both frontend and backend
- MongoDB database (Mongoose)

## 🛠️ Tech stack
- Frontend: Angular 19, Tailwind CSS, Angular Material
- Backend: Node.js, Express, Mongoose
- Auth: Google OAuth (GSI), JWT

## 🔒 Notes on Google Sign-In (GSI)
GSI requires a secure context (HTTPS) and will not work over plain HTTP except on `localhost`.

Test accounts (examples provided by the project author):
- Student: kathiresan.it22@bitsathy.ac.in
- Admin: kathir2004admin@gmail.com
- Staff: kathir2004harini@gmail.com

## 📦 Docker (local development / quick start)
This repository includes a `docker-compose.yml` at the project root with two services:

- `backend` — builds from `./backend`, exposes port 3000 (mapped `3000:3000`)
- `frontend` — builds from `./frontend/courseRegistration`, serves the Angular app on port 80 inside the container and is mapped to host port 4200 (mapped `4200:80`)

Prerequisites
- Docker Desktop (Windows) — make sure Docker Engine and Docker Compose are available.

Environment variables
Create a `.env` file in the project root (next to `docker-compose.yml`) with the following values:

```env
# Example .env (replace placeholders before running)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/dbname
JWT_SECRET=your_jwt_secret_here
CLIENT_ID=your_google_oauth_client_id
```

How to build & run (PowerShell)

```powershell
# build and start all services in detached mode
docker compose up --build -d

# view logs (all services)
docker compose logs -f

# view logs for a single service (e.g., backend)
docker compose logs -f backend

# stop and remove containers
docker compose down

# rebuild a single service and restart (example: backend)
docker compose build backend; docker compose up -d backend
```

Accessing the app
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000 (paths as defined in `backend/src/routes`)

Useful tips
- If you change environment variables in `.env`, restart the services with `docker compose down` then `docker compose up --build -d`.

## 🗂️ Project structure (high level)
- `backend/` — Node.js API, Dockerfile for backend
- `frontend/courseRegistration` — Angular app, Dockerfile for frontend
- `docker-compose.yml` — orchestrates backend and frontend containers

## 🌐 Deployment notes
The project was deployed on an AWS EC2 instance, where NGINX served as a reverse proxy on port 80 for the Angular frontend and forwarded API requests to the Node.js backend running under PM2. Google OAuth credentials and JWT secrets were securely managed in the backend environment.

## 📜 License
This project is licensed under the [MIT License](LICENSE).
