'use client';

import { ToolForm } from "@/components/ToolForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">Lesson ideas</h2>
                <p className="text-sm text-zinc-600">Generate different ways to teach the same lesson with teacher and student actions.</p>
            </header>

            <ToolForm
                toolId="lesson-ideas"
                fields={[
                    { name: 'lesson_title', label: 'Lesson Title', placeholder: 'e.g. Present Simple Tense', required: true },
                    { name: 'subject', label: 'Subject', placeholder: 'e.g. English', required: true },
                    { name: 'grade', label: 'Grade', type: 'select', options: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Prep 1', 'Prep 2', 'Prep 3', 'Secondary 1', 'Secondary 2', 'Secondary 3'], required: true },
                ]}
            />
        </div>
    );
}
