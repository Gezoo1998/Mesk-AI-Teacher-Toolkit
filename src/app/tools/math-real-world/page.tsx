'use client';

import { ToolForm } from "@/components/ToolForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-amber-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">Real-World Math Connector</h2>
                <p className="text-sm text-zinc-600">Connect abstract math concepts to exciting real-life scenarios.</p>
            </header>

            <ToolForm
                toolId="math-real-world"
                fields={[
                    {
                        name: 'topic',
                        label: 'Math Concept',
                        placeholder: 'e.g. Pythagoras Theorem, Slope, Ratios',
                        required: true
                    },
                    {
                        name: 'interests',
                        label: 'Student Interests (Optional)',
                        placeholder: 'e.g. Football, Video Games, Space',
                        required: false
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
