## Mesk AI Teacher Toolkit – Website Roadmap

### Phase 0 – Product Definition
- Clarify the main goal: a practical AI assistant for Mesk teachers that turns everyday classroom needs into ready‑to‑use outputs.
- Define primary user segments: English teachers, Math teachers, other subjects; Primary, Prep, Secondary.
- Finalize core value props:
  - Fast, ready-to-use classroom content.
  - Age-appropriate outputs with clear grade control.
  - Egyptian Arabic explanations with English academic terms.
- Decide initial supported tools (from the README system prompt):
  - Lesson Ideas Generator
  - Lesson Planner
  - Text Summarizer (Teacher Mode)
  - Math Word Problems Generator
  - Vocabulary List Generator
  - Activity Generator
  - Question Generator

### Phase 1 – Information Architecture & UX
- Map the main navigation:
  - Home (overview + quick access tiles for tools).
  - Tools hub (list of all tools with short descriptions).
  - Individual tool pages (one page per tool).
  - “How to use” page for teachers (simple, non-technical guide).
- Define user journeys:
  - A teacher opens the site, selects grade and subject, picks a tool, fills a short form, and gets output.
  - Returning teacher quickly reuses last configuration (subject, grade, language mode) – stored in local storage in early versions.
- Design simple, low-friction forms for each tool:
  - Minimal required fields: subject, grade, language mode, core description.
  - Optional advanced settings (difficulty level, duration, number of questions, etc.).

### Phase 2 – Visual Design & Design System
- Define design language that matches the README instructions:
  - White background, gold accent, soft gold gradients.
  - Card-based layout with clear section separation.
- Create reusable design tokens:
  - Colors: primary gold, secondary gray, backgrounds, borders.
  - Typography scale suitable for dashboards (titles, section headers, body, captions).
- Define reusable UI components:
  - App shell: header, footer, responsive sidebar or top navigation.
  - Page sections: card containers, section headers, content blocks.
  - Form components: labeled inputs, textareas, selects, sliders, buttons, toggles.
  - Status components: loading state, error state, empty state.

### Phase 3 – Technical Foundation
- Create a new web project in a `web/` folder using Next.js + TypeScript + Tailwind CSS (to stay consistent with other Mesk projects on this machine).
- Set up project structure:
  - `src/app` with `layout.tsx` and `page.tsx` for the main landing page.
  - `src/app/tools` for the tools hub.
  - `src/app/tools/[toolId]` for individual tool pages.
  - `src/components` for shared UI components (layout, cards, forms, buttons).
  - `src/lib` for shared utilities (validation, mapping between tools and prompt templates).
- Configure global styles according to the white + gold theme and dashboard layout.
- Set up ESLint, TypeScript strict mode, and basic formatting rules.

### Phase 4 – Core UX Implementation (No AI Yet)
- Build the shell:
  - Header with logo/title “Mesk AI Teacher Toolkit” and language toggle (Arabic / English mode).
  - Left or top navigation linking to Home, Tools, and Help.
  - Responsive layout working well on laptops and tablets.
- Implement the landing page:
  - Short hero section explaining what the toolkit does for teachers.
  - Cards for each of the 7 tools with short descriptions and “Open tool” buttons.
  - Quick-start presets (e.g., “English – Grade 5 – 40-minute lesson”).
- Implement the Tools hub page:
  - Search/filter by subject and grade.
  - Tool list with tags (Lesson, Activities, Assessment, etc.).
- Implement individual tool pages:
  - Dynamic rendering based on tool metadata (title, description, required fields, output sections).
  - Form for input (lesson title, subject, grade, difficulty, etc. depending on tool).
  - Output area with structured sections matching the README (e.g., objectives, warm-up, activities, assessment).
  - Local-only “Generate sample output” placeholder function (static fake data) until AI is integrated.

### Phase 5 – Prompt Engine & AI Integration (Backend-Ready)
- Create a prompt-building layer that turns form inputs into structured prompts matching the README templates:
  - One prompt builder per tool, sharing common fields (grade, subject, language mode).
  - Ensure prompts always respect: no emojis, grade level, Egyptian Arabic explanations with English academic terms.
- Define an internal API interface for calling the AI backend:
  - For now, abstract as a `generateContent(toolId, payload)` function so the UI does not depend on the actual provider.
- Implement a mock AI service initially:
  - Local fake responses during development to test UI and flows.
- Prepare for real integration:
  - Design request/response DTOs that are easy to plug into OpenAI, local LLMs, or a custom backend later.
  - Add simple error handling and retry states in the UI.

### Phase 6 – Teacher Experience & Productivity Features
- Add quality-of-life features for teachers:
  - “Copy all” and “Copy section” buttons for generated content.
  - “Download as .docx” or `.pdf` (Phase 6.2, can be postponed).
  - “Refine” controls (e.g., make it simpler, add more activities, adjust level).
- Implement basic personalization stored in the browser:
  - Remember last used grade, subject, and language mode using local storage.
  - Optional profile nickname so content can be tailored (e.g., “Ms. Sara’s class”).
- Add templates/presets per phase of the school year (review, exam prep, new unit).

### Phase 7 – Quality, Analytics & Launch
- Add validation and guardrails:
  - Ensure required fields are filled in before generating content.
  - Warn if inputs are too short or too long relative to the tool.
- Implement basic analytics hooks (ready for integration later):
  - Track tool usage (which tools are most used, no personal data).
  - Track common grades/subjects to prioritize improvements.
- Test across devices:
  - Laptop, large tablet, small tablet views.
  - RTL alignment check for Arabic-heavy content.
- Prepare content and messaging:
  - Short “How to use this toolkit” guide page.
  - FAQ for common teacher questions (e.g., “Is this aligned with the curriculum?”).
- Launch an internal beta for Mesk teachers, collect feedback, then iterate.

### Immediate Next Steps (What I Will Start Now)
- Initialize the technical foundation by creating the Next.js + TypeScript + Tailwind project inside a `web/` folder.
- Implement a first version of the landing page with:
  - Toolkit branding and short description.
  - Cards for the 7 tools defined in the README.
  - Navigation shell ready for future tools pages.

