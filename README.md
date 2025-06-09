# 🧠 Second Brain — Shareable Knowledge Management Tool

A personal second brain to store, organize, and access your notes, links, and insights — now with secure sharing! Share your knowledge via private, time-bound links with a clean, read-only interface.

---

## 🚀 Features

- 🔖 Create and save cards with title, tags, and links (no file uploads)
- 🔍 Filter, search, and sort content
- 🌗 Dark mode support
- 🔒 Share content via unique tokens (expire after 7 days)
- ✉️ Email notifications for registration & password reset using Brevo SMTP
- 🔑 Secure password storage with bcrypt
- 📱 Fully responsive UI

---

## 🛠️ Tech Stack

**Frontend**:
- React + TypeScript
- Vite + Tailwind CSS
- Axios, React Icons

**Backend**:
- Node.js + Express
- MongoDB + Mongoose
- UUID for tokens
- Nodemailer (SMTP via Brevo)
- bcrypt for hashing passwords

**Deployment**:
- Frontend: [Netlify](https://netlify.com)
- Backend: [Render](https://render.com)

---

## 🧪 How It Works

- Users create cards with a title, link, and optional tags.
- Cards are visually displayed and can be filtered or searched.
- A "Share" button generates a secure tokenized URL.
- Anyone with the link can access the read-only version (expires in 7 days).
- Email notifications are triggered on sign-up and password reset.

---

## 🔐 Shareable Links

- Links are token-based and expire after 7 days.
- Shared links show a read-only version of your cards.
- Editing/deleting is disabled for shared views.



Example:
```bash
https://secondbrain.netlify.app/shared/5c8ec64c-e9d4-456e-a86b-a37b341b8d7e


##  📦 Setup Locally

git clone https://github.com/your-username/second-brain.git
cd second-brain

# Frontend
cd Client
npm install
npm run dev

---

Create a .env in frontend
VITE_BACKEND_URL=https://second-brain-mndo.onrender.com

# Backend
cd ../Server
npm install
npm run build     # Compile TypeScript
npm start         # Start the server


---

Create a .env in backend

PORT_NUMBER=5000
DB_URL=your-mongo-uri
JWT_KEY=your-jwt-secret

SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
SENDER_EMAIL=you@example.com
FRONTEND_URL=https://secondbrain.netlify.app




🌍 Live Demo
Check it out here 👉 secondbrain.netlify.app


🧠 Notes
The project only supports link-based content — no file uploads yet.

Backend is TypeScript-based; run npm run build before npm start.


If you found this useful or want to connect:

Twitter: @kalyan__tr
