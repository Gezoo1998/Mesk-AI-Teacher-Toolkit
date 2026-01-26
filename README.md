# 🏫 Mesk AI Teacher Toolkit

> **Your Intelligent Teaching Companion** – Turn ideas into classroom-ready resources in seconds.

The **Mesk AI Teacher Toolkit** is a specialized, AI-powered platform designed specifically for educators at **Mesk Language School**. It leverages cutting-edge Large Language Models (LLMs) to automate time-consuming preparations, allowing teachers to focus on what matters most: **teaching and student engagement.**

---

## ✨ Key Features

The toolkit provides **24+ specialized AI tools** categorized for maximum efficiency:

### 📝 Planning & Ideas
- **Lesson Ideas Generator**: Strategic pedagogical approaches for any topic.
- **Complete Lesson Planner**: Structured plans including objectives, warm-ups, and assessments.
- **PBL Planner**: Comprehensive Project-Based Learning unit designer.
- **Reading Level Adjuster**: Rewrite content for Easy, Medium, or Hard reading abilities.

### 🎨 Content Creation
- **Text Summarizer**: Teacher-friendly summaries with key bullet points.
- **Math & Science Problems**: Story-based problems with step-by-step solutions.
- **Vocabulary Story Weaver**: Contextualize word lists into engaging narratives.
- **Dialogue Crafter**: Natural situational dialogues for language practice.

### ⚡ Engagement & Focus
- **Hook Generator**: Exciting lesson starters to grab immediate attention.
- **Gamify This Lesson**: Transform academic content into interactive games.
- **Real-World Math Connector**: Link abstract concepts to sports, gaming, and lifestyle.
- **Debate Topic Spark**: Generate age-appropriate controversial topics for discussion.

### 📊 Assessment & Feedback
- **Question Generator**: MCQs, short answers, and critical thinking prompts with keys.
- **Smart Rubric Generator**: Objective grading criteria for any assignment.
- **Lab Safety Checker**: Hazard identification and precautions for experiments.
- **Peer Review Framework**: Structured feedback templates for students.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **AI Engine**: [Groq SDK](https://groq.com/) (LLaMA 3.3 models)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Exporting**: `jsPDF` for PDFs and `html-docx-js` for Word documents.

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- A Groq API Key (get one at [console.groq.com](https://console.groq.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Gezoo1998/Mesk-AI-Teacher-Toolkit.git
   cd Mesk-AI-Teacher-Toolkit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```env
   GROQ_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the toolkit.

---

## 📁 Project Structure

```text
src/
├── app/            # Next.js App Router (Routes & Pages)
├── components/     # Reusable UI Components
├── contexts/       # React Contexts (Language, etc.)
├── lib/            # Utilities, AI Services, & Translations
│   ├── ai/         # AI Prompt logic & API service
│   ├── i18n/       # Internationalization (Ar/En)
│   └── data/       # Static tool metadata
└── public/         # Static assets (Logos, Icons)
```

---

## 🌍 Internationalization

The toolkit fully supports **English** and **Arabic (Egyptian)**. It uses a custom `LanguageContext` and a robust translation dictionary in `src/lib/i18n/translations.ts` to provide a seamless RTL (Right-to-Left) and LTR experience.

---

## 📄 License & Ownership

Developed for **Mesk Language School**. All rights reserved.  
Built with ❤️ by **Abdelrahman ElGezawy**.