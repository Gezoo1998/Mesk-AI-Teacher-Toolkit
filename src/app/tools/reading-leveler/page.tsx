'use client';

import { ToolForm } from '@/components/ToolForm';

export default function ReadingLevelerPage() {
    return (
        <ToolForm
            toolId="reading-leveler"
            fields={[
                { name: 'text', label: 'Text to Rewrite', type: 'textarea', placeholder: 'Paste your text here...', required: true },
                { name: 'grade', label: 'Target Grade Level', type: 'text', placeholder: 'e.g., Grade 4', required: true }
            ]}
        />
    );
}
