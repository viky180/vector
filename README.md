# SkillBridge - EdTech Learning + Placement MVP

SkillBridge is a modern role-based EdTech platform MVP with learning workflows and recruiter hiring pipelines.

## Tech Stack
- Frontend: React + Tailwind CSS (Vite)
- Backend: Node.js + Express
- Database: Supabase (integration-ready) with in-memory fallback for fast local run
- Auth: JWT login/signup

## Project Structure
```text
SkillBridge/
  backend/
    src/
      config/
      data/
      middleware/
      routes/
      services/
      utils/
      app.js
      server.js
    package.json
    .env.example
  frontend/
    src/
      api/
      components/
      context/
      pages/
      routes/
      App.jsx
      main.jsx
      index.css
    package.json
    .env.example
```

## Features Delivered

### Roles
- Student
- Teacher
- Recruiter
- Admin

### Student
- Signup/login
- Dashboard with enrolled courses and live classes
- Performance metrics (score, attendance)
- Auto-generated resume preview

### Teacher
- Dashboard overview
- Create/manage courses
- Schedule live classes
- Upload assignments and grade students (API-ready)

### Recruiter
- Candidate list
- Filter by skills and minimum score
- Shortlist candidates

### Admin
- Platform stats
- Manage users
- Approve teacher accounts
- View activity feed

### Pages
- Landing page
- Login/signup page
- Student dashboard
- Teacher dashboard
- Recruiter dashboard
- Admin dashboard
- Course detail page

## Local Run Instructions

### 1) Backend setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```
Backend runs at: `http://localhost:5000`

### 2) Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
Frontend runs at: `http://localhost:5173`

## Demo Logins
- `student@skillbridge.com / password123`
- `teacher@skillbridge.com / password123`
- `recruiter@skillbridge.com / password123`
- `admin@skillbridge.com / password123`

## Supabase Notes
The backend is configured with Supabase client support.

To connect your Supabase project:
1. Create tables for users/courses/enrollments/classes/assignments/performance/shortlists/activity.
2. Add values in `backend/.env`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Extend service-layer methods in `backend/src/services` to persist/retrieve from Supabase.

For MVP speed, current implementation uses seeded in-memory data so the app runs immediately.

## Scalability Notes
- Modular backend (routes + services + middleware)
- Reusable frontend shell components for role dashboards
- API client abstraction for future pagination/caching
- Easy path to migrate seed data to Supabase tables
