'use client';

import { ToolForm } from '@/components/ToolForm';

export default function SmartRubricPage() {
    return (
        <ToolForm
            toolId="smart-rubric"
            fields={[
                { name: 'title', label: 'Assignment Title', type: 'text', placeholder: 'e.g., Persuasive Essay', required: true },
                { name: 'grade', label: 'Grade Level', type: 'text', placeholder: 'e.g., Grade 5', required: true },
                { name: 'description', label: 'Assignment Description', type: 'textarea', placeholder: 'Describe what students need to do...', required: true }
            ]}
        />
    );
}
