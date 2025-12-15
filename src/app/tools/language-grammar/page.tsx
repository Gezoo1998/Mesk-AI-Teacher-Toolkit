'use client';

import { ToolForm } from "@/components/ToolForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-indigo-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">Grammar in Context</h2>
                <p className="text-sm text-zinc-600">Weave grammar rules into engaging stories for natural acquisition.</p>
            </header>

            <ToolForm
                toolId="language-grammar"
                fields={[
                    {
                        name: 'language',
                        label: 'Target Language',
                        type: 'select',
                        options: ['French', 'German', 'Spanish', 'Italian', 'English'],
                        required: true
                    },
                    {
                        name: 'grammar_point',
                        label: 'Grammar Rule',
                        placeholder: 'e.g. Past Tense (Passé Composé), Future Perfect',
                        required: true
                    },
                    {
                        name: 'theme',
                        label: 'Story Theme',
                        placeholder: 'e.g. A mystery at a hotel, A space adventure',
                        required: true
                    },
                ]}
            />
        </div>
    );
}
