CitizenVoice – Community Issue Reporting Platform

CitizenVoice is a full-stack web application designed to empower citizens to report local issues, track their progress, and engage transparently with local administration. The platform provides a structured reporting workflow, multilingual support, role-based access control, and administrative tools for effective issue management.

📌 Project Overview

Project Name: CitizenVoice
Authors: Florian Haka,
Repository: https://github.com/fhaka/CitizenVoice

CitizenVoice serves as a digital bridge between citizens and local authorities by enabling transparent issue reporting, monitoring, and resolution tracking. It is built as a modern web application using React on the frontend and Node.js with Express on the backend, backed by a MySQL relational database.

🎯 Target Users & Stakeholders

Citizens

Report community issues

Track the status of their reports

Browse community-reported issues

Administrators

Review, manage, and update reports

Manage users and system data

Access audit logs and analytics

Guests

Browse public community reports without authentication

❗ Problem Statement & Motivation

Local community issues (e.g., road damage, sanitation, lighting) are often reported through fragmented, inefficient, or non-transparent channels. Citizens frequently lack visibility into the status of their reports, while administrators struggle with prioritization, tracking, and accountability.

CitizenVoice addresses this gap by:

Centralizing issue reporting in a single platform

Providing transparent status tracking

Supporting multilingual communities

Offering administrators structured workflows and auditability

🎯 Project Objectives

Enable citizens to report issues quickly and intuitively

Provide real-time visibility into report status changes

Ensure secure role-based access for citizens and administrators

Support multilingual user interfaces

Maintain a clean separation of concerns through modular architecture

💡 Solution Overview

CitizenVoice is a client-server web application composed of:

A React-based frontend for user interaction

A RESTful backend API built with Node.js and Express

A MySQL database for persistent storage

JWT-based authentication and role-based authorization

Core Functionalities

User authentication (citizen & admin roles)

Issue reporting with optional photo and map location

Report lifecycle management (Pending → In Progress → Resolved / Rejected)

Community browsing and filtering

Admin dashboard for report/user management

Multilingual Help Center and UI translations

Audit logging for admin actions

🏗️ System Architecture
High-Level Architecture
[ Browser (React Frontend) ]
            |
            |  HTTPS (REST API, JWT)
            v
[ Node.js + Express Backend ]
            |
            |  SQL Queries
            v
[ MySQL Database ]

Component Breakdown
Frontend (React)

User interface

Routing and protected routes

Internationalization (i18n)

State management (AuthContext)

Backend (Node.js + Express)

REST API endpoints

Authentication & authorization

Business logic (reports, users, admin actions)

File uploads

Audit logging

Database (MySQL)

Users

Reports

Report status history

Help center questions

Admin audit logs

🧠 Key Design Decisions & Trade-offs

JWT Authentication: Chosen for stateless, scalable session handling

MySQL: Ensures relational integrity and structured querying

Separation of Roles: Clear boundaries between citizen, admin, and guest

Modular Structure: Improves maintainability and extensibility

Manual SQL Schema: Full control over database design (trade-off: no migrations yet)

🧰 Technologies & Tools
Frontend

React (Vite)

React Router

i18next (internationalization)

Axios / Fetch API

Leaflet (maps)

Backend

Node.js

Express.js

JSON Web Tokens (JWT)

Multer (file uploads)

bcrypt (password hashing)

Database

MySQL (InnoDB, utf8mb4)

Development & Collaboration

Git & GitHub

REST API design

Environment-based configuration (.env)

🗂️ Project Structure
Frontend (frontend/)
src/
 ├── assets/           # Images and static assets
 ├── components/       # Reusable UI components & navbars
 ├── context/          # AuthContext and global state
 ├── data/             # Static data (Help Center)
 ├── pages/            # Application pages
 ├── utils/            # Helpers (query, theme)
 ├── i18n.js           # Internationalization config
 ├── App.jsx
 └── main.jsx

Backend (backend/)
backend/
 ├── config/           # Database configuration
 ├── controllers/      # Business logic
 ├── middleware/       # Auth, roles, uploads
 ├── routes/           # API route definitions
 ├── utils/            # Audit logging utilities
 └── index.js          # Application entry point

🗄️ Database Schema (Overview)
users

id

role

personal_id

full_name

email

password

city, phone, profile_photo

is_active

timestamps

reports

id

title

description

category

city

latitude, longitude

photo_url

status

user_id

timestamps

report_status_history

id

report_id

old_status

new_status

note

changed_by

timestamp

help_questions

multilingual question/answer fields

category

sort_order

is_active

admin_audit_logs

admin_id

action

entity_type

entity_id

details (JSON)

created_at

🔌 API Documentation (Summary)
Authentication

POST /api/auth/signup

POST /api/auth/login

Reports

POST /api/reports (Citizen)

GET /api/reports/my

GET /api/reports/community

GET /api/reports/:id

Admin

GET /api/admin/reports

PUT /api/admin/reports/:id/status

GET /api/admin/users

GET /api/admin/audit-logs

Users

GET /api/users/me

PUT /api/users/profile

All protected endpoints require JWT authorization.

🚀 Setup & Deployment Guide
Prerequisites

Node.js (v18+ recommended)

MySQL Server

npm or yarn

Backend Setup
cd backend
npm install


Create .env:

DB_HOST=localhost
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=citizenvoice
JWT_SECRET=your_secret
PORT=5000


Start backend:

npm start

Frontend Setup
cd frontend
npm install
npm run dev

🧪 Testing & Quality Assurance

Manual testing of user flows (auth, reports, admin actions)

Validation of inputs on frontend and backend

Error handling and status codes

Role-based access verification

Database constraint validation

🧑‍💻 GitHub Usage & Collaboration

Feature-based commits

Clear commit messages

Logical separation of frontend/backend

Centralized repository structure

Team-based development with shared responsibilities

🎥 Demonstration

The system supports live demonstration via:

Citizen report submission

Admin report status updates

Community browsing

Language switching

Audit log tracking

Known limitations are acknowledged during demos.

⚠️ Challenges & Lessons Learned
Challenges

Synchronizing frontend i18n keys with backend content

Managing role-based access consistently

Handling file uploads securely

Maintaining UI clarity across languages

Lessons Learned

Importance of clean architecture

Early schema planning reduces refactoring

Clear separation of concerns improves maintainability

Internationalization requires careful planning

🔮 Future Improvements

Email & in-app notifications

Advanced analytics dashboards

Database migrations

Mobile application

Admin-configurable categories

User preferences persistence

📄 License

This project is intended for academic and educational purposes.
License can be added if the project is open-sourced publicly.

👥 Authors

Florian Haka
Kristi Mata
