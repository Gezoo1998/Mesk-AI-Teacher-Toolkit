'use client';

import { ToolForm } from "@/components/ToolForm";

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">Text summarizer</h2>
                <p className="text-sm text-zinc-600">Turn long texts into short summary, bullet points, and teacher-friendly explanation.</p>
            </header>

            <ToolForm
                toolId="text-summarizer"
                fields={[
                    { name: 'input_text', label: 'Text to Summarize', type: 'textarea', placeholder: 'Paste the educational text here...', required: true },
                ]}
            />
        </div>
    );
}
