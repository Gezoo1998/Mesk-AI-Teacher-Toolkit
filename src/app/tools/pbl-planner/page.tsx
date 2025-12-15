'use client';

import { ToolForm } from '@/components/ToolForm';

export default function PBLPlannerPage() {
    return (
        <ToolForm
            toolId="pbl-planner"
            fields={[
                { name: 'topic', label: 'Project Topic', type: 'text', placeholder: 'e.g., Sustainable City', required: true },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'e.g., Science & Social Studies', required: true },
                { name: 'grade', label: 'Grade Level', type: 'text', placeholder: 'e.g., Grade 7', required: true },
                { name: 'duration', label: 'Duration', type: 'text', placeholder: 'e.g., 2 weeks', required: true }
            ]}
        />
    );
}
