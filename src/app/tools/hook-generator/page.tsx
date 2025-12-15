'use client';

import { ToolForm } from '@/components/ToolForm';

export default function HookGeneratorPage() {
    return (
        <ToolForm
            toolId="hook-generator"
            fields={[
                { name: 'topic', label: 'Lesson Topic', type: 'text', placeholder: 'e.g., Photosynthesis', required: true },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'e.g., Science', required: true },
                { name: 'grade', label: 'Grade Level', type: 'text', placeholder: 'e.g., Grade 6', required: true }
            ]}
        />
    );
}
