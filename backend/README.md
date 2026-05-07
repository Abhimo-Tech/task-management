# TaskFlow Backend

Production-ready Node.js + Express + MySQL backend for TaskFlow using JWT authentication and MVC architecture.

## Folder Structure

```text
backend/
  database/
    schema.sql
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    services/
    utils/
    app.js
  .env.example
  package.json
  server.js
```

## Features

- JWT authentication with email/password
- Google OAuth login using Passport Google Strategy
- Task CRUD with pagination, search, filters, and sorting
- Team creation and membership management
- Notification module with auto-created assignment and reminder alerts
- Dashboard and report APIs for frontend charts
- Express validation, global error handling, prepared queries, and secure defaults

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`

### Tasks

- `POST /api/tasks`
- `GET /api/tasks?status=&priority=&user=&search=&page=&limit=&sortBy=deadline|priority`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Teams

- `POST /api/teams`
- `GET /api/teams`
- `POST /api/teams/:id/add-member`
- `GET /api/teams/:id`

### Notifications

- `GET /api/notifications`
- `PUT /api/notifications/:id/read`
- `PUT /api/notifications/read-all`

### Dashboard

- `GET /api/dashboard/summary`

### Reports

- `GET /api/reports/weekly`
- `GET /api/reports/status-distribution`
- `GET /api/reports/category-analysis`
- `GET /api/reports/productivity`

## Setup

1. Copy `.env.example` to `.env`
2. Create the MySQL database using `database/schema.sql`
3. Install packages with `npm install`
4. Start the server with `npm run dev`

## Required Environment Variables

- `PORT`
- `CLIENT_URL`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`

## Notes

- The backend is intentionally isolated in `backend/` so it can coexist cleanly with the current Vite React frontend.
- Google OAuth can return JSON or redirect to a frontend URL using `redirect_url` on the callback flow.
- Deadline reminders are generated automatically when the notifications API is requested for tasks due within 24 hours.
