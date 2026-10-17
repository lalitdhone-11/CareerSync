# CareerSync
AI-powered interview preparation platform that analyzes resumes and job descriptions, generates personalized interview questions, and validates workflows using Jest, Supertest, and Playwright:

- A **match score** showing how well your profile fits the role
- **Technical** and **behavioral** interview questions, each with the interviewer's intention and a model answer
- A list of **skill gaps** ranked by severity
- A **day-by-day preparation plan**
- A **tailored, one-page, ATS-friendly resume** you can download as a PDF

## Tech Stack

| Layer    | Technology                                                              |
| -------- | ----------------------------------------------------------------------- |
| Frontend | React 18, Vite, Tailwind CSS 3, React Router 6, Redux Toolkit, Axios    |
| Backend  | Node.js, Express 5, MongoDB (Mongoose), JWT auth (HTTP-only cookie)     |
| AI       | Google Gemini via `@google/genai`                                       |
| Files    | `multer` (resume upload), `pdf-parse` (read PDF), `pdfkit` (build PDF)  |

## Project Structure

```
CareerSync/
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Reusable UI (Button, ScoreRing, ResumeUpload, ...)
│       ├── pages/          # Welcome, Login, Signup, Dashboard, InterviewReport, ...
│       ├── services/       # Axios API layer
│       ├── store/          # Redux slices (auth, interview)
│       └── lib/            # Helpers (download, formatting)
└── server/                 # Express backend
    └── src/
        ├── controllers/    # auth + interview request handlers
        ├── middlewares/    # JWT auth, file upload
        ├── models/         # User, InterviewReport, Blacklist (Mongoose)
        ├── routes/         # /api/auth, /api/interview
        └── services/       # Gemini calls + resume PDF rendering
```

## Prerequisites

- [Node.js](https://nodejs.org) 18 or newer
- A [MongoDB](https://www.mongodb.com) database (local or MongoDB Atlas)
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com)

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd CareerSync

cd server && npm install
cd ../client && npm install
```

### 2. Configure environment variables

**`server/.env`**

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/careersync
JWT_SECRET=replace_with_a_long_random_string
GOOGLE_GENAI_API_KEY=your_gemini_api_key

# Optional: comma-separated list of models to try, in order
# GEMINI_MODELS=gemini-3.8-flash
```

**`client/.env`**

```env
# Backend origin; Vite proxies /api requests here during development
VITE_BACKEND_URL=http://localhost:3000
```

### 3. Run the app

Open two terminals:

```bash
# Terminal 1: backend (http://localhost:3000)
cd server
npm run dev

# Terminal 2: frontend (http://localhost:5173)
cd client
npm run dev
```

Then open **http://localhost:5173**.

## How It Works

1. **Sign up / log in.** A JWT is stored in an HTTP-only cookie.
2. **Create a plan.** On the dashboard, upload your resume (PDF, max 3 MB), paste the job description, and optionally add a short self-description.
3. **AI analysis.** The server extracts the resume text and asks Gemini for a structured JSON report, which is saved to MongoDB.
4. **Review your report.** Browse technical and behavioral questions, skill gaps, and your preparation plan.
5. **Download your resume.** Gemini rewrites your resume as structured JSON (truthful, no invented experience), and the server renders it as a **one-page A4 PDF**. The font shrinks automatically if the content is long. The structured data is cached per plan, so repeat downloads don't use extra AI requests.

## API Reference

All `/api/interview` routes require authentication.

| Method | Endpoint                                   | Description                                      |
| ------ | ------------------------------------------ | ------------------------------------------------ |
| POST   | `/api/auth/register`                       | Create an account                                |
| POST   | `/api/auth/login`                          | Log in (sets auth cookie)                        |
| GET    | `/api/auth/logout`                         | Log out                                          |
| GET    | `/api/auth/get-me`                         | Get the current user                             |
| POST   | `/api/interview`                           | Generate a report (multipart: `resume`, `jobDescription`, `selfDescription`) |
| GET    | `/api/interview`                           | List your reports                                |
| GET    | `/api/interview/report/:interviewId`       | Get a single report                              |
| POST   | `/api/interview/resume/pdf/:interviewReportId` | Download the tailored one-page resume PDF    |

## Troubleshooting

**`503 UNAVAILABLE` / "model is experiencing high demand"**
Google's side is overloaded. The server retries automatically with backoff. If it still fails, try again in a minute.

**`429 RESOURCE_EXHAUSTED` / "exceeded your current quota"**
The Gemini free tier has a small daily request limit per model. Each report generation and each first-time resume download uses one request. Wait for the quota to reset, create an API key in a new Google project, or enable billing.

**`404 model ... is no longer available`**
Google retires older models. Set `GEMINI_MODELS` in `server/.env` to a model your key can access (check Google AI Studio).

**Resume download fails**
Check the server terminal for a line starting with `Resume PDF error:` or `Gemini ... failed`. The cause is almost always one of the three errors above.

**Cookie / login issues in development**
Use `http://localhost:5173` (not `127.0.0.1`) and make sure the backend CORS origin in `server/src/app.js` matches your frontend URL.

## Scripts

| Location  | Command           | Description                      |
| --------- | ----------------- | -------------------------------- |
| `server/` | `npm run dev`     | Start the API with nodemon       |
| `client/` | `npm run dev`     | Start the Vite dev server        |
| `client/` | `npm run build`   | Production build                 |
| `client/` | `npm run preview` | Preview the production build     |

## Security Notes

- Never commit `.env` files. They are already in `.gitignore`.
- Use a long, random `JWT_SECRET` in production.
- Interview reports and resume downloads are scoped to the logged-in user.
 
