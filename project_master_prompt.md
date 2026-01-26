# PROMPT: Mesk AI Teacher Toolkit Development

## 1. Project Overview
**Name**: Mesk AI Teacher Toolkit
**Mission**: empower Egyptian teachers with advanced AI tools tailored to their curriculum and culture.
**Core Value**: A premium, "Royal" user experience that combines powerful AI utility with a warm, inviting, and highly polished interface.

## 2. Tech Stack Setup
*   **Framework**: Next.js 15 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS v4
*   **Animation**: `framer-motion` (Orchestration, Layout Transitions), `react-parallax-tilt` (3D Card Effects)
*   **Icons**: `lucide-react`
*   **AI Provider**: Groq SDK (`groq-sdk`) - utilizing Llama models for high-speed inference.
*   **Localization**: Custom context for English (`en`) and Egyptian Arabic (`ar`).

## 3. Solution Architecture
### Directory Structure
*   `src/app`: Next.js App Router pages.
    *   `src/app/tools/[tool-id]`: Individual pages for each tool.
*   `src/components`: Reusable UI.
    *   `ToolCard.tsx`: Glassmorphic, 3D-tilt enabled cards.
    *   `ToolForm.tsx`: Standardized input form with generic fields.
*   `src/lib`: Data and Logic.
    *   `ai/generate.ts`: Groq API integration.
    *   `ai/prompts.ts`: Centralized prompt templates.
    *   `data/tools.tsx`: Registry of all tools and categories.
    *   `i18n/translations.ts`: Localization strings.

## 4. The Tool Suite (20 Tools)
The application hosts 20 AI tools categorized into 4 sections:

### 🚀 Planning & Ideas
1.  **Lesson Ideas**: Generate 3-5 distinct teaching approaches.
2.  **Lesson Planner**: Complete lesson plans with objectives and timing.
3.  **PBL Planner**: Project-Based Learning unit creator.
4.  **Reading Leveler**: Adjust text difficulty (Easy/Medium/Hard).

### ✨ Focus & Engagement
5.  **Hook Generator**: Creative lesson starters.
6.  **Gamify This Lesson**: Turn content into games (Jeopardy, etc.).
7.  **Classroom Icebreakers**: Quick community-building activities.
8.  **Debate Topic Spark**: Generate age-appropriate debate topics.
9.  **Real-World Math**: Connect math to sports/gaming/life.

### 📖 Content Creation
10. **Text Summarizer**: Summarize long info for students.
11. **Vocabulary Lists**: Generate leveled word banks.
12. **Vocabulary Story Weaver**: Create stories using specific words.
13. **Dialogue Crafter**: Language practice dialogues.
14. **Grammar in Context**: Stories focusing on specific grammar rules.
15. **Math & Science Problems**: Story-based word problems.
16. **Misconception Buster**: Address common scientific myths.

### 📋 Assessment & Feedback
17. **Smart Rubric Generator**: Create grading matrices.
18. **Question Generator**: MCQs, Short Answer, Thinking questions.
19. **Activities & Questions**: Practice exercises.
20. **Lab Safety Checker**: Safety protocols for experiments.

## 5. UI/UX & Design Guidelines
**Aesthetic**: "Royal Motion" / Premium Glass.
*   **Glassmorphism**: Heavy use of `backdrop-blur-xl`, `bg-white/60`, and subtle white borders to create depth.
*   **Colors**: Primary **Amber/Gold** palette (`amber-500`, `yellow-600`) paired with warm neutrals (`fdfbf7`).
*   **Animations**:
    *   **Mandatory**: Use `framer-motion` for all page entries (staggered `animate-slide-up`).
    *   **Interactions**: Buttons and cards must utilize `whileHover` (scale, lift).
    *   **3D Effects**: Interactive elements should act like physical objects using `react-parallax-tilt`.
*   **Imagery**: Use high-quality visual assets. Never use gray placeholders. Use vibrant, specific icons or generated illustrations that fit the "Golden" theme.

## 6. AI Prompt Engineering Rules
*   **Language**: All AI outputs MUST be in **Egyptian Colloquial Arabic (العامية المصرية)** contextually, unless the user requests English.
*   **Formatting**: Use clear Markdown headers, bold text for emphasis, and bullet points.
*   **Numbers**: ALWAYS use English digits (1, 2, 3) even in Arabic text.

## 7. Implementation Instructions
When extending this project:
1.  **Animations First**: Every new component must be animated. Default to a "slide-up and fade-in" for content.
2.  **Modular Tools**: To add a new tool, register it in `tools.tsx`, add a prompt in `prompts.ts`, and create a page using `ToolForm`.
3.  **Performance**: Optimize animations to run at 60fps. Avoid heavy layout trashing.
