import { Lightbulb, Calendar, FileText, Calculator, BookA, Gamepad2, HelpCircle, Globe, Zap, MessageCircle, BookOpen, ClipboardCheck, Signal, Magnet, Map, PartyPopper, Scale, ShieldAlert, Trophy, Feather } from 'lucide-react';

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
    },
    {
        id: 'smart-rubric',
        title: 'Smart Rubric Generator',
        description: 'Create detailed grading criteria with scoring levels for any assignment.',
        href: '/tools/smart-rubric',
        icon: <ClipboardCheck />,
        color: 'rose',
        tags: ['Assessment']
    },
    {
        id: 'reading-leveler',
        title: 'Reading Level Adjuster',
        description: 'Rewrite text to suit different reading abilities (Easy, Medium, Hard).',
        href: '/tools/reading-leveler',
        icon: <Signal />,
        color: 'sky',
        tags: ['Differentiation']
    },
    {
        id: 'hook-generator',
        title: 'Hook Generator',
        description: 'Exciting ways to start your lesson and grab student attention immediately.',
        href: '/tools/hook-generator',
        icon: <Magnet />,
        color: 'amber',
        tags: ['Engagement']
    },
    {
        id: 'pbl-planner',
        title: 'PBL Planner',
        description: 'Plan comprehensive Project-Based Learning units with milestones and driving questions.',
        href: '/tools/pbl-planner',
        icon: <Map />,
        color: 'emerald',
        tags: ['Planning']
    },
    {
        id: 'icebreakers',
        title: 'Classroom Icebreakers',
        description: 'Fun, low-stakes activities to build community and warm up the class.',
        href: '/tools/icebreakers',
        icon: <PartyPopper />,
        color: 'purple',
        tags: ['Community']
    },
    {
        id: 'debate-spark',
        title: 'Debate Topic Spark',
        description: 'Generate controversial but appropriate topics to fuel constructive class debates.',
        href: '/tools/debate-spark',
        icon: <Scale />,
        color: 'indigo',
        tags: ['Critical Thinking']
    },
    {
        id: 'lab-safety',
        title: 'Lab Safety Checker',
        description: 'Identify hazards and safety precautions for any science experiment.',
        href: '/tools/lab-safety',
        icon: <ShieldAlert />,
        color: 'rose',
        tags: ['Science', 'Safety']
    },
    {
        id: 'gamify-lesson',
        title: 'Gamify This Lesson',
        description: 'Turn any lesson content into an engaging classroom game structure.',
        href: '/tools/gamify-lesson',
        icon: <Trophy />,
        color: 'amber',
        tags: ['Gamification']
    },
    {
        id: 'vocab-story',
        title: 'Vocabulary Story Weaver',
        description: 'Weave a list of vocabulary words into a coherent, creative story.',
        href: '/tools/vocab-story',
        icon: <Feather />,
        color: 'purple',
        tags: ['Literacy']
    }
];
