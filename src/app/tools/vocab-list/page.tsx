'use client';

import { ToolForm } from "@/components/ToolForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">Vocabulary lists</h2>
                <p className="text-sm text-zinc-600">Age-appropriate word lists with definitions, examples, and teacher usage tips.</p>
            </header>

            <ToolForm
                toolId="vocab-list"
                fields={[
                    { name: 'topic', label: 'Topic', placeholder: 'e.g. Space Exploration', required: true },
                    { name: 'grade', label: 'Grade', type: 'select', options: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Prep 1', 'Prep 2', 'Prep 3', 'Secondary 1', 'Secondary 2', 'Secondary 3'], required: true },
                ]}
            />
        </div>
    );
}
