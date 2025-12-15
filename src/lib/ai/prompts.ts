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

Output structure:

1. Lesson Objectives
- Clear and measurable objectives

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

Make the plan realistic for a real classroom.
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
    // Add other templates as needed based on tool IDs
};

export function buildPrompt(toolId: string, data: Record<string, unknown>, language: 'en' | 'ar' = 'en'): { system: string, user: string } {
    let template = TEMPLATES[toolId];

    if (!template) {
        // Fallback or generic prompt if specific template missing
        template = `Generate content for tool: ${toolId}. Data: ${JSON.stringify(data)}`;
    }

    // Replace placeholders
    let userPrompt = template;
    for (const [key, value] of Object.entries(data)) {
        userPrompt = userPrompt.replace(new RegExp(`{{\\s*${key}\\s*}}`, 'g'), String(value || ''));
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
