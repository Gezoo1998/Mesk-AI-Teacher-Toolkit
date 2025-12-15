import { Lightbulb, Calendar, FileText, Calculator, BookA, Gamepad2, HelpCircle, Globe, Zap, MessageCircle, BookOpen } from 'lucide-react';

export interface Tool {
    id: string;
    title: string;
    description: string;
    href: string;
    icon?: React.ReactNode;
    color: 'amber' | 'emerald' | 'sky' | 'purple' | 'rose' | 'indigo' | 'slate';
    tags: string[];
}

export const TOOLS: Tool[] = [
    {
        id: 'lesson-ideas',
        title: 'Lesson ideas',
        description: 'Generate different ways to teach the same lesson with teacher and student actions.',
        href: '/tools/lesson-ideas',
        icon: <Lightbulb />,
        color: 'amber',
        tags: ['3–5 ideas']
    },
    {
        id: 'lesson-planner',
        title: 'Lesson planner',
        description: 'Objectives, warm-up, explanation, activities, assessment, and homework in one structure.',
        href: '/tools/lesson-planner',
        icon: <Calendar />,
        color: 'emerald',
        tags: ['Full lesson']
    },
    {
        id: 'text-summarizer',
        title: 'Text summarizer',
        description: 'Turn long texts into short summary, bullet points, and teacher-friendly explanation.',
        href: '/tools/text-summarizer',
        icon: <FileText />,
        color: 'sky',
        tags: ['3-part output']
    },
    {
        id: 'math-problems',
        title: 'Math & Science Word Problems',
        description: 'Real-life stories for Math or Science with given, required, solution steps, final answer, and teaching hint.',
        href: '/tools/math-problems',
        icon: <Calculator />,
        color: 'purple',
        tags: ['Story-based']
    },
    {
        id: 'vocab-list',
        title: 'Vocabulary lists',
        description: 'Age-appropriate word lists with definitions, examples, and teacher usage tips.',
        href: '/tools/vocab-list',
        icon: <BookA />,
        color: 'rose',
        tags: ['Word banks']
    },
    {
        id: 'activities',
        title: 'Activities & questions',
        description: 'Classroom activities, games, and assessment questions matching topic and difficulty.',
        href: '/tools/activities',
        icon: <Gamepad2 />,
        color: 'indigo',
        tags: ['Practice']
    },
    {
        id: 'question-generator',
        title: 'Question Generator',
        description: 'Generate MCQs, short answer, and thinking questions with answer keys.',
        href: '/tools/question-generator',
        icon: <HelpCircle />,
        color: 'slate',
        tags: ['Assessment']
    },
    {
        id: 'math-real-world',
        title: 'Real-World Math Connector',
        description: 'Connect abstract math concepts to engaging real-life scenarios like sports, architecture, or gaming.',
        href: '/tools/math-real-world',
        icon: <Globe />,
        color: 'amber',
        tags: ['Engagement']
    },
    {
        id: 'science-misconception',
        title: 'Misconception Buster',
        description: 'Address common scientific myths with clear facts, true/false tables, and simple experiments.',
        href: '/tools/science-misconception',
        icon: <Zap />,
        color: 'rose',
        tags: ['Critical Thinking']
    },
    {
        id: 'language-dialogue',
        title: 'Dialogue Crafter',
        description: 'Generate natural, situational dialogues for foreign language practice with cultural notes.',
        href: '/tools/language-dialogue',
        icon: <MessageCircle />,
        color: 'sky',
        tags: ['Speaking']
    },
    {
        id: 'language-grammar',
        title: 'Grammar in Context',
        description: 'Create short stories that naturally weave in specific grammar rules for contextual learning.',
        href: '/tools/language-grammar',
        icon: <BookOpen />,
        color: 'indigo',
        tags: ['Grammar']
    }
];
