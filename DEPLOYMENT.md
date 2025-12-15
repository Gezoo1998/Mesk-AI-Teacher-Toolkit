# Deployment Guide

The Mesk AI Teacher Toolkit is built with **Next.js** and can be easily deployed to **Vercel**.

## Prerequisites
- A GitHub repository containing this code.
- A Vercel account.
- Your **Groq API Key**.

## Step-by-Step Deployment

1.  **Push to GitHub**:
    Ensure your latest code is committed and pushed to your GitHub repository.

2.  **Import to Vercel**:
    - Go to your Vercel Dashboard.
    - Click "Add New..." -> "Project".
    - Import the `mesk-ai-teacher-toolkit` repository.

3.  **Configure Project**:
    - **Framework Preset**: Next.js (should be auto-detected).
    - **Root Directory**: `.` (default).
    - **Build Command**: `npm run build` (default).

4.  **Environment Variables**:
    **Crucial Step**: You must add your API Key here.
    - Expand the **Environment Variables** section.
    - Key: `GROQ_API_KEY`
    - Value: `gsk_...` (Your actual API Key)
    - Click **Add**.

5.  **Deploy**:
    - Click **Deploy**.
    - Vercel will build your application. This may take a minute.

6.  **Success**:
    - Once built, you will get a live URL (e.g., `https://mesk-ai-toolkit.vercel.app`).
    - Visit the link and test the "Lesson Ideas" tool.

## Troubleshooting
- **Build Fails**: Check the Build Logs. Common issues are linting errors (we have fixed most) or TypeScript errors.
- **AI Not Working**: Check the "Runtime Logs" in Vercel. If you see "401 Unauthorized" or "API Key missing", re-check your Environment Variables in Vercel settings and redeploy.
