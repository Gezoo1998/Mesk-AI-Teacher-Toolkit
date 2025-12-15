'use client';

import { ToolForm } from '@/components/ToolForm';

export default function DebateSparkPage() {
    return (
        <ToolForm
            toolId="debate-spark"
            fields={[
                { name: 'topic', label: 'General Topic', type: 'text', placeholder: 'e.g., Artificial Intelligence', required: true },
                { name: 'grade', label: 'Grade Level', type: 'text', placeholder: 'e.g., High School', required: true }
            ]}
        />
    );
}
