'use client';

import { ToolForm } from "@/components/ToolForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-sky-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">Dialogue Crafter</h2>
                <p className="text-sm text-zinc-600">Generate natural dialogues with cultural context for language classes.</p>
            </header>

            <ToolForm
                toolId="language-dialogue"
                fields={[
                    {
                        name: 'language',
                        label: 'Target Language',
                        type: 'select',
                        options: ['French', 'German', 'Spanish', 'Italian', 'English'],
                        required: true
                    },
                    {
                        name: 'scenario',
                        label: 'Scenario',
                        placeholder: 'e.g. Asking for directions, Ordering coffee',
                        required: true
                    },
                    {
                        name: 'level',
                        label: 'Proficiency Level',
                        type: 'select',
                        options: ['Beginner (A1)', 'Elementary (A2)', 'Intermediate (B1)', 'Upper Intermediate (B2)', 'Advanced (C1)'],
                        required: true
                    },
                ]}
            />
        </div>
    );
}
