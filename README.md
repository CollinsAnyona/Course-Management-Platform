
# JuaJobs API - Summative Project

## Overview

JuaJobs is a backend API developed using Node.js, Express.js, and Sequelize ORM for managing an educational course allocation system. The platform supports role-based access for Managers and Facilitators, offering functionality for authentication, course creation, facilitator allocation, activity tracking, and more.

---

## Features

### Authentication & Authorization
- JWT-based login system
- Role-based access control (Manager, Facilitator)
- Password hashing with bcrypt

### Course Management
- Create, update, delete, and retrieve courses
- Manage cohorts and intake classes

### User Management
- Manager can create users with specific roles
- Facilitators can login to view assigned courses

### Course Allocation
- Assign courses to facilitators based on cohort, trimester, and delivery mode

### Activity Tracker (Bonus)
- Track and schedule course-related activities with reminders

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **ORM:** Sequelize
- **Database:** PostgreSQL
- **Authentication:** JWT
- **Testing:** Mocha, Chai
- **Scheduler:** node-cron for reminders

---

## Setup Instructions

### Prerequisites
- Node.js v14+
- PostgreSQL

### Installation

```bash
git clone https://github.com/your-repo/jua-jobs-api.git
cd jua-jobs-api
npm install
```

### Environment Variables

Create a `.env` file with the following content:

```env
PORT=3000
JWT_SECRET=your_jwt_secret_key
DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=jua_jobs_db
```

### Database Migration

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### Running the Server

```bash
npm start
```

---

## API Endpoints

### Auth

```http
POST /api/auth/login
```

### Courses

```http
POST /api/courses
GET /api/courses
```

### Cohorts

```http
POST /api/cohorts
GET /api/cohorts
```

### Users (Managers only)

```http
POST /api/users
GET /api/users
```

### Course Allocations

```http
POST /api/course-allocations
GET /api/course-allocations
```

### Facilitator View

```http
GET /api/facilitator/allocations
```

### Activity Tracker

```http
POST /api/activity-tracker
GET /api/activity-tracker
```

---

## Testing

Run unit tests using Mocha:

```bash
npm test
```

---

## Contributors

- Otieno Collins Jr (Executive Developer)
---

## Reflection page
https://collinsanyona.github.io/Course-Management-Platform/

## Video Walkthrough
https://youtu.be/bWzbeamiVxg
