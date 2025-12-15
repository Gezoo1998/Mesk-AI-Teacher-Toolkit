'use client';

import { ToolForm } from "@/components/ToolForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-rose-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">Misconception Buster</h2>
                <p className="text-sm text-zinc-600">Tackle common scientific myths with facts and experiments.</p>
            </header>

            <ToolForm
                toolId="science-misconception"
                fields={[
                    {
                        name: 'topic',
                        label: 'Scientific Topic / Myth',
                        placeholder: 'e.g. Seasons are caused by distance from sun',
                        required: true
                    },
                    {
                        name: 'grade',
                        label: 'Grade',
                        type: 'select',
                        options: ['Primary 4', 'Primary 5', 'Primary 6', 'Prep 1', 'Prep 2', 'Prep 3', 'Secondary 1'],
                        required: true
                    },
                ]}
            />
        </div>
    );
}
