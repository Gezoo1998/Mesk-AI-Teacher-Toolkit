import { Lightbulb, Calendar, FileText, Calculator, BookA, Gamepad2, HelpCircle, Globe, Zap, MessageCircle, BookOpen, ClipboardCheck, Signal, Magnet, Map, PartyPopper, Scale, ShieldAlert, Trophy, Feather, Clock, ScrollText } from 'lucide-react';

export interface Tool {
    id: string;
    title: string;
    description: string;
    href: string;
    icon?: React.ReactNode;
    color: 'amber' | 'emerald' | 'sky' | 'purple' | 'rose' | 'indigo' | 'slate';
    tags: string[];
    category: 'planning' | 'engagement' | 'content' | 'assessment';
}

export const TOOLS: Tool[] = [
    {
        id: 'lesson-ideas',
        title: 'Lesson Ideas Generator',
        description: 'AI-powered tool to generate multiple creative teaching approaches for any lesson topic, including teacher actions and student activities.',
        href: '/tools/lesson-ideas',
        icon: <Lightbulb />,
        color: 'amber',
        tags: ['3–5 ideas', 'Lesson Planning'],
        category: 'planning'
    },
    {
        id: 'lesson-planner',
        title: 'Complete Lesson Planner',
        description: 'Create comprehensive lesson plans with objectives, warm-up activities, explanations, student activities, assessment strategies, and homework assignments.',
        href: '/tools/lesson-planner',
        icon: <Calendar />,
        color: 'emerald',
        tags: ['Full lesson', 'Curriculum Integration'],
        category: 'planning'
    },
    {
        id: 'text-summarizer',
        title: 'Educational Text Summarizer',
        description: 'Transform lengthy educational texts into concise summaries, bullet-point key points, and clear teacher explanations for better student comprehension.',
        href: '/tools/text-summarizer',
        icon: <FileText />,
        color: 'sky',
        tags: ['3-part output', 'Reading Comprehension'],
        category: 'content'
    },
    {
        id: 'math-problems',
        title: 'Math & Science Word Problems',
        description: 'Real-life stories for Math or Science with given, required, solution steps, final answer, and teaching hint.',
        href: '/tools/math-problems',
        icon: <Calculator />,
        color: 'purple',
        tags: ['Story-based'],
        category: 'content'
    },
    {
        id: 'vocab-list',
        title: 'Vocabulary lists',
        description: 'Age-appropriate word lists with definitions, examples, and teacher usage tips.',
        href: '/tools/vocab-list',
        icon: <BookA />,
        color: 'rose',
        tags: ['Word banks'],
        category: 'content'
    },
    {
        id: 'activities',
        title: 'Activities & questions',
        description: 'Classroom activities, games, and assessment questions matching topic and difficulty.',
        href: '/tools/activities',
        icon: <Gamepad2 />,
        color: 'indigo',
        tags: ['Practice'],
        category: 'assessment'
    },
    {
        id: 'question-generator',
        title: 'Assessment Question Generator',
        description: 'Automatically create multiple-choice questions, short answers, and critical thinking prompts with complete answer keys for classroom assessment.',
        href: '/tools/question-generator',
        icon: <HelpCircle />,
        color: 'slate',
        tags: ['Assessment', 'MCQs', 'Answer Keys'],
        category: 'assessment'
    },
    {
        id: 'math-real-world',
        title: 'Real-World Math Connector',
        description: 'Connect abstract math concepts to engaging real-life scenarios like sports, architecture, or gaming.',
        href: '/tools/math-real-world',
        icon: <Globe />,
        color: 'amber',
        tags: ['Engagement'],
        category: 'engagement'
    },
    {
        id: 'science-misconception',
        title: 'Misconception Buster',
        description: 'Address common scientific myths with clear facts, true/false tables, and simple experiments.',
        href: '/tools/science-misconception',
        icon: <Zap />,
        color: 'rose',
        tags: ['Critical Thinking'],
        category: 'content'
    },
    {
        id: 'language-dialogue',
        title: 'Dialogue Crafter',
        description: 'Generate natural, situational dialogues for foreign language practice with cultural notes.',
        href: '/tools/language-dialogue',
        icon: <MessageCircle />,
        color: 'sky',
        tags: ['Speaking'],
        category: 'content'
    },
    {
        id: 'language-grammar',
        title: 'Grammar in Context',
        description: 'Create short stories that naturally weave in specific grammar rules for contextual learning.',
        href: '/tools/language-grammar',
        icon: <BookOpen />,
        color: 'indigo',
        tags: ['Grammar'],
        category: 'content'
    },
    {
        id: 'smart-rubric',
        title: 'Smart Rubric Generator',
        description: 'Create detailed grading criteria with scoring levels for any assignment.',
        href: '/tools/smart-rubric',
        icon: <ClipboardCheck />,
        color: 'rose',
        tags: ['Assessment'],
        category: 'assessment'
    },
    {
        id: 'reading-leveler',
        title: 'Reading Level Adjuster',
        description: 'Rewrite text to suit different reading abilities (Easy, Medium, Hard).',
        href: '/tools/reading-leveler',
        icon: <Signal />,
        color: 'sky',
        tags: ['Differentiation'],
        category: 'planning'
    },
    {
        id: 'hook-generator',
        title: 'Hook Generator',
        description: 'Exciting ways to start your lesson and grab student attention immediately.',
        href: '/tools/hook-generator',
        icon: <Magnet />,
        color: 'amber',
        tags: ['Engagement'],
        category: 'engagement'
    },
    {
        id: 'pbl-planner',
        title: 'PBL Planner',
        description: 'Plan comprehensive Project-Based Learning units with milestones and driving questions.',
        href: '/tools/pbl-planner',
        icon: <Map />,
        color: 'emerald',
        tags: ['Planning'],
        category: 'planning'
    },
    {
        id: 'icebreakers',
        title: 'Classroom Icebreakers',
        description: 'Fun, low-stakes activities to build community and warm up the class.',
        href: '/tools/icebreakers',
        icon: <PartyPopper />,
        color: 'purple',
        tags: ['Community'],
        category: 'engagement'
    },
    {
        id: 'debate-spark',
        title: 'Debate Topic Spark',
        description: 'Generate controversial but appropriate topics to fuel constructive class debates.',
        href: '/tools/debate-spark',
        icon: <Scale />,
        color: 'indigo',
        tags: ['Critical Thinking'],
        category: 'engagement'
    },
    {
        id: 'lab-safety',
        title: 'Lab Safety Checker',
        description: 'Identify hazards and safety precautions for any science experiment.',
        href: '/tools/lab-safety',
        icon: <ShieldAlert />,
        color: 'rose',
        tags: ['Science', 'Safety'],
        category: 'assessment'
    },
    {
        id: 'gamify-lesson',
        title: 'Gamify This Lesson',
        description: 'Turn any lesson content into an engaging classroom game structure.',
        href: '/tools/gamify-lesson',
        icon: <Trophy />,
        color: 'amber',
        tags: ['Gamification'],
        category: 'engagement'
    },
    {
        id: 'vocab-story',
        title: 'Vocabulary Story Weaver',
        description: 'Weave a list of vocabulary words into a coherent, creative story.',
        href: '/tools/vocab-story',
        icon: <Feather />,
        color: 'purple',
        tags: ['Literacy'],
        category: 'content'
    },
    {
        id: 'historical-perspective',
        title: 'Historical Perspective Simulator',
        description: 'Create immersive historical learning experiences by generating diary entries and viewpoints from multiple figures involved in key events.',
        href: '/tools/historical-perspective',
        icon: <Clock />,
        color: 'slate',
        tags: ['Multiple viewpoints', 'History Education'],
        category: 'content'
    },
    {
        id: 'arabic-literature',
        title: 'Arabic Literature Analyzer',
        description: 'Summarize and analyze Arabic literary texts with themes and questions.',
        href: '/tools/arabic-literature',
        icon: <BookOpen />,
        color: 'rose',
        tags: ['Arabic texts'],
        category: 'content'
    },
    {
        id: 'math-proof-assistant',
        title: 'Advanced Math Proof Assistant',
        description: 'Guide through step-by-step mathematical proofs and derivations.',
        href: '/tools/math-proof-assistant',
        icon: <Calculator />,
        color: 'purple',
        tags: ['Step-by-step'],
        category: 'content'
    },
    {
        id: 'peer-review',
        title: 'Peer Review Framework Creator',
        description: 'Generate structured peer review checklists and feedback templates.',
        href: '/tools/peer-review',
        icon: <ClipboardCheck />,
        color: 'emerald',
        tags: ['Collaboration'],
        category: 'assessment'
    }
];
