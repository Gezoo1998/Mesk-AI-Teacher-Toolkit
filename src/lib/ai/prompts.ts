export const SYSTEM_PROMPT = `
You are an AI Teaching Assistant designed specifically for teachers at Mesk Language School.

Target users:
- Teachers of all subjects
- All grades (Primary, Prep, Secondary)

Response style:
- Detailed, clear, and practical
- Teacher-friendly tone
- Step-by-step explanations
- Ready-to-use classroom content
- No emojis in educational content

Rules:
- Always adapt content to the specified Grade
- Content must be age-appropriate
- Avoid unnecessary complexity
- No references to curriculum names unless explicitly asked
- No markdown titles larger than H3

Formatting:
- Use clear sections
- Use bullet points when helpful
- Outputs must be easy to copy and paste

You are not a chatbot.
You are a professional educational tool.

When generating content, structure the output to be displayed inside a clean educational dashboard UI.
UI theme:
- Background: White
- Accent color: Gold
- Use soft gold gradients when suggesting visual hierarchy
- Layout-friendly sections suitable for cards
- Clear separation between sections

Do NOT describe the UI.
Just structure the content cleanly so it fits a white & gold gradient dashboard.
`;

const TEMPLATES: Record<string, string> = {
    'lesson-ideas': `
Generate teaching ideas for the following lesson:

Lesson Title: {{lesson_title}}
Subject: {{subject}}
Grade: {{grade}}

Output the result in the following structure:

1. Lesson Overview
- Brief explanation of the lesson idea in simple teacher-friendly language

2. Teaching Ideas (3–5 ideas)
- Each idea should include:
  - What the teacher does
  - What students do

3. In-Class Activities
- At least 2 activities
- Explain how to run each activity step by step

4. Home Activities
- Practical homework ideas related to real life

5. Real-Life Examples
- Examples that students can relate to easily

6. Teacher Tips
- Classroom management tips
- Common mistakes to avoid
- Engagement tips

Make the content detailed, practical, and immediately usable in class.
`,
    'lesson-planner': `
Create a detailed lesson plan using the following information:

Lesson Title: {{lesson_title}}
Subject: {{subject}}
Grade: {{grade}}
Lesson Duration: {{duration}}
Curriculum Standard: {{curriculum_standard}}

Output structure:

1. Lesson Objectives
- Clear and measurable objectives aligned with curriculum standards

2. Warm-Up (5–10 minutes)
- Activity description
- Purpose of the warm-up

3. Main Explanation
- Step-by-step explanation
- Teaching flow
- Key questions to ask students

4. Activities
- Individual activity
- Pair or group activity
- Explain instructions clearly

5. Assessment
- How the teacher checks understanding during the lesson

6. Homework
- Meaningful homework related to the lesson

Learning Objectives Tags: [List 3-5 key learning objectives this lesson addresses, tagged with curriculum codes if available]

Make the plan realistic for a real classroom and aligned with Egyptian curriculum where applicable.
`,
    'question-generator': `
Generate a set of questions for the following topic:

Topic: {{topic}}
Subject: {{subject}}
Grade: {{grade}}
Question Count: {{count}}
Difficulty: {{difficulty}}

STRICT OUTPUT STRUCTURE:

## Part 1: Questions
(List the questions here numbered 1, 2, 3...)

---

## Part 2: Answer Key
(List the answers here numbered 1, 2, 3... corresponding to the questions above)

Rules:
- Do not mix questions and answers.
- Ensure questions are appropriate for the grade level.
- Ensure answers are correct and concise.
`,
    'math-problems': `
Generate a set of word problems based on the following details:

Subject: {{subject_type}} (Math or Science)
Topic: {{topic}}
Grade: {{grade}}
Difficulty: {{difficulty}}
Number of Problems: {{count}}

Output Structure:

## Part 1: Word Problems
(List the problems here numbered 1, 2, 3...)
- Ensure each problem has a clear "Given" and "Required" structure explicitly or implicitly in the story.
- Make the stories relate to real life.

## Part 2: Answer Key & Steps
(List the solutions here numbered 1, 2, 3...)
- Show the step-by-step solution for each.
- Provide the final answer clearly.

Learning Objectives Tags: [List 3-5 key learning objectives these problems address, aligned with curriculum standards]
`,
    'math-real-world': `
Generate 3 distinct real-world scenarios that use the following math concept:

Math Concept: {{topic}}
Grade Level: {{grade}}
Student Interests: {{interests}}

Output Structure:
1. Scenario Title (e.g., "Designing a Skyscraper")
2. The Hook (A short, exciting story intro)
3. Where the Math Fits (Explain clearly how the concept is used to solve a problem in this scenario)
4. Application Question (A quick problem for students to solve based on the story)

Make the examples diverse (different industries/hobbies).
`,
    'science-misconception': `
Address the following scientific topic/misconception:

Topic: {{topic}}
Grade: {{grade}}

Output Structure:

## The Myth vs. Reality
(Create a table comparing the Common Misconception vs. The Scientific Truth)

## The Science Behind It
(Explain the correct concept clearly and simply for this age group)

## Prove It! (Experiment/Analogy)
(Describe a simple experiment or a clear analogy that proves the truth. If an experiment, use simple classroom materials.)
`,
    'language-dialogue': `
Create a dialogue for a foreign language class:

Target Language: {{language}}
Scenario: {{scenario}}
Proficiency Level: {{level}}

Output Structure:

## The Dialogue
(Write the dialogue in {{language}}. Ensure it sounds natural, not robotic. Use appropriate slang if level permits.)

## Teacher's Key
- **Vocabulary**: List 5 key words used.
- **Cultural Note**: Explain any relevant cultural context or etiquette shown in the dialogue.
- **English Translation**: Provide the full translation.
`,
    'language-grammar': `
Write a short story to practice detailed grammar:

Target Language: {{language}}
Grammar Point: {{grammar_point}}
Story Theme: {{theme}}

Output Structure:

## The Story
(Write a short, engaging story in {{language}} that naturally uses the {{grammar_point}} at least 8-10 times. Highlight or **bold** the grammar instances if possible.)

## Comprehension Check
1. (Question about the story)
2. (Question about the grammar usage)
`,
    'smart-rubric': `
Generate a grading rubric for the following assignment:

Title: {{title}}
Grade: {{grade}}
Description: {{description}}

Output Structure:
## Rubric Table
| Criteria | Excellent (4) | Good (3) | Needs Improvement (2) | Unsatisfactory (1) |
|----------|---------------|----------|-----------------------|--------------------|
(Fill the table with 4-5 key criteria like Content, Organization, Grammar, etc. and specific descriptors for each level.)
`,
    'reading-leveler': `
Rewrite the following text for 3 different reading levels:

Target Audience Grade: {{grade}}
Original Text: {{text}}

Output Structure:
## Level 1: Simplified (Easy)
(Short sentences, simple vocabulary, focus on main idea.)

## Level 2: Standard (Medium)
(Appropriate for the target grade level, balanced complexity.)

## Level 3: Advanced (Hard)
(Complex sentence structures, advanced vocabulary, deeper analysis.)
`,
    'hook-generator': `
Generate 5 creative "Hooks" to start a lesson on:

Topic: {{topic}}
Subject: {{subject}}
Grade: {{grade}}

Output Structure:
## 1. The Mystery/Puzzle
(A riddle or object lesson to spark curiosity)

## 2. The Real-World Connection
(Relating the topic to something students love, like games/sports/trends)

## 3. The Visual/Video Intro
(Description of a video clip or image to show)

## 4. The Provocative Question
(A deep or controversial question to discuss)

## 5. The Active Challenge
(A quick physical or interactive challenge)
`,
    'pbl-planner': `
Design a Project-Based Learning (PBL) unit for:

Topic: {{topic}}
Subject: {{subject}}
Grade: {{grade}}
Duration: {{duration}}

Output Structure:
## Project Title & Driving Question
- **Title**: (Catchy title)
- **Driving Question**: (Open-ended question students must answer)

## Project Overview
(Brief description of the real-world problem students will solve)

## Milestones & Timeline
- **Week 1**: (Research/Planning)
- **Week 2**: (Drafting/Building)
- **Week 3**: (Refining/Presenting)

## Final Product
(What exactly will students create? e.g., A model, a video, a proposal)
`,
    'icebreakers': `
Suggest 3 classroom icebreakers/activities:

Class Size: {{class_size}}
Time Available: {{time}}
Goal: {{goal}} (e.g., Get to know each other, Energy, Teamwork)

Output Structure:
## 1. Activity Name
- **Time**:
- **Consumables**: (Any materials needed)
- **Instructions**: (Step-by-step guide)

## 2. Activity Name
- **Time**:
- **Consumables**:
- **Instructions**:

## 3. Activity Name
- **Time**:
- **Consumables**:
- **Instructions**:
`,
    'debate-spark': `
Generate 5 debate topics/motions for:

Subject/Topic: {{topic}}
Grade: {{grade}}

Output Structure:
(List 5 topics. For each, provide a "Pro" hint and a "Con" hint)

## 1. (Motion Statement)
- **Pro**: (One strong argument for)
- **Con**: (One strong argument against)

... (repeat for 5)
`,
    'lab-safety': `
Analyze the safety hazards for this experiment:

Experiment: {{experiment}}
Grade: {{grade}}

Output Structure:
## Potential Hazards
(List physical, chemical, or biological hazards)

## Safety Precautions
- **PPE**: (Goggles, gloves, etc.)
- **Before Lab**: (What to check)
- **During Lab**: (Rules to follow)
- **Emergency**: (What to do if something spills/breaks)
`,
    'gamify-lesson': `
Turn this lesson content into a game:

Lesson Topic: {{topic}}
Grade: {{grade}}
Game Style: {{style}} (e.g., Jeopardy, Escape Room, Bingo, Relay Race)

Output Structure:
## Game Title
(Catchy name)

## Objective
(How to win)

## Materials Needed
(List of items)

## Rules of Play
1. (Step 1)
2. (Step 2)
...

## Content Integration
(Explain how the lesson questions/content fit into the game mechanic)
`,
    'vocab-story': `
Write a short creative story using these words:

Vocabulary List: {{words}}
Grade Level: {{grade}}
Story Theme: {{theme}}

Output Structure:
## The Story
(A coherent, fun story. **Bold** the vocabulary words from the list when they appear.)

## Word Usage Check
(List the words and a brief definition contextually used in the story)
`,
    'historical-perspective': `
Generate multiple historical perspectives for immersive learning:

Historical Event: {{event}}
Grade Level: {{grade}}
Number of Perspectives: {{perspectives}}

Output Structure:

## Historical Context
(Brief overview of the event)

## Perspectives
(Generate {{perspectives}} different viewpoints, each as a diary entry, letter, or first-person account from different figures involved. Label each as "Perspective 1: [Figure Name]", etc.)

## Teacher Notes
(Discussion questions and learning objectives for this activity)
`,
    'arabic-literature': `
Analyze Arabic literary text:

Text: {{text}}
Grade Level: {{grade}}
Analysis Type: {{type}}

Output Structure:

## Summary
(Concise summary of the text in Arabic and English)

## Key Themes
(List and explain main themes)

## Vocabulary & Language Features
(Important words, literary devices used)

## Comprehension Questions
(5-10 questions with answers, appropriate for grade level)
`,
    'math-proof-assistant': `
Guide through a mathematical proof:

Math Concept: {{concept}}
Grade Level: {{grade}}
Proof Type: {{type}}

Output Structure:

## Problem Statement
(Clearly state what needs to be proven)

## Step-by-Step Proof
(Guide through each logical step, with explanations and common pitfalls to avoid)

## Verification
(How to check if the proof is correct)

## Applications
(Real-world examples where this proof is used)
`,
    'peer-review': `
Create a peer review framework:

Assignment Type: {{assignment}}
Grade Level: {{grade}}
Subject: {{subject}}

Output Structure:

## Peer Review Checklist
(Bullet points of criteria for students to evaluate)

## Feedback Prompts
(Open-ended questions to guide constructive comments)

## Rubric Integration
(How this ties into grading rubrics)

## Teacher Moderation Tips
(How to facilitate and ensure positive peer feedback)
`,
};

export function buildPrompt(toolId: string, data: Record<string, unknown>, language: 'en' | 'ar' = 'en'): { system: string, user: string } {
    let userPrompt: string;

    if (data.refineType && data.currentContent) {
        // Refine mode
        userPrompt = `Refine the following content by ${data.refineType}:\n\n${data.currentContent}\n\nProvide the refined version maintaining the same structure and style.`;
    } else {
        let template = TEMPLATES[toolId];

        if (!template) {
            // Fallback or generic prompt if specific template missing
            template = `Generate content for tool: ${toolId}. Data: ${JSON.stringify(data)}`;
        }

        // Replace placeholders
        userPrompt = template;
        for (const [key, value] of Object.entries(data)) {
            userPrompt = userPrompt.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value || ''));
        }
    }

    // Append Language Instructions
    if (language === 'ar') {
        userPrompt += `
\n\nIMPORTANT LANGUAGE INSTRUCTIONS:
- The content MUST be in **Egyptian Colloquial Arabic (العامية المصرية)** for all explanations, intros, and narrative. Do not use Modern Standard Arabic (Fusha) unless absolutely necessary for formal headers.
- **Scientific & Mathematical Terms**: MUST be in **English** (Latin characters). You may add the Arabic equivalent in parentheses for clarity if needed, but the primary term must be English (e.g., "Photosynthesis", not "التمثيل الضوئي").
- **CRITICAL RULE**: ALL NUMBERS (1, 2, 3...) MUST BE WRITTEN IN **ENGLISH DIGITS** (1, 2, 3), NOT Arabic/Hindu-Arabic digits (١, ٢, ٣).
- Do not translate technical keys if the template requires specific structure, but content must be Egyptian Arabic.
`;
    } else {
        userPrompt += `
\n\nIMPORTANT LANGUAGE INSTRUCTIONS:
- The content MUST be in **English**.
- Ensure professional academic tone.
`;
    }

    return {
        system: SYSTEM_PROMPT,
        user: userPrompt
    };
}
