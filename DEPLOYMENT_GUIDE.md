# Deployment Guide: Zero Code Bangla Hub

This guide will walk you through deploying your full-stack application.

## Prerequisites
- A GitHub account (repo pushed).
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (for database).
- A [Render](https://render.com) account (for backend).
- A [Vercel](https://vercel.com) account (for frontend).

---

## Part 1: Database Setup (MongoDB Atlas)
1. Log in to MongoDB Atlas and create a new **Cluster** (Free tier is fine).
2. Go to **Database Access** > Create a Database User (username/password). **Remember these credentials!**
3. Go to **Network Access** > Add IP Address > Allow Access from Anywhere (`0.0.0.0/0`).
4. Go to **Database** > Connect > Drivers > Copy the **Connection String**.
   - It looks like: `mongodb+srv://<user>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<user>` and `<password>` with your database credentials.

---

## Part 2: Backend Deployment (Render)
1. Log in to your Render Dashboard.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. **Configure the Service:**
   - **Name:** `zero-code-backend` (or unique name)
   - **Region:** Any (e.g., Singapore or Frankfurt)
   - **Branch:** `main`
   - **Root Directory:** `server` (Important!)
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables:**
   - Scroll down to "Environment Variables".
   - Add Key: `MONGO_URI`
   - Value: Paste your MongoDB Connection String from Part 1.
   - Add Key: `PORT`
   - Value: `5000` (Optional, Render does this automatically but good to be safe)
6. Click **Create Web Service**.
7. Wait for deployment to finish. You will see "Live" status.
8. **Copy the backend URL** from the top left (e.g., `https://zero-code-backend.onrender.com`).

---

## Part 3: Frontend Deployment (Vercel)
1. Log in to your Vercel Dashboard.
2. Click **Add New...** > **Project**.
3. Import your GitHub repository.
4. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (Leave as default)
5. **Environment Variables:**
   - Open the "Environment Variables" section.
   - Add Key: `VITE_API_URL`
   - Value: Your Render Backend URL + `/api`
     - Example: `https://zero-code-backend.onrender.com/api`
     - **Make sure to include `/api` at the end!**
6. Click **Deploy**.
7. Wait for the build to complete.

---

## Part 4: Final Verification
1. Open your Vercel deployment link (e.g., `https://zero-code-hub.vercel.app`).
2. Try to **Log In** or **Enroll**.
3. If it works, your Frontend is successfully talking to your Backend on Render, which is talking to MongoDB!

### Troubleshooting
- **CORS Error:** If you see network errors, ensure your Backend allows the Vercel domain. Currently, we set `app.use(cors())` which allows all, so it should work.
- **500 Internal Server Error:** Check Render logs. Usually means MongoDB connection failed (wrong password/IP allowlist).
- **404:** Ensure `VITE_API_URL` ends with `/api`.
