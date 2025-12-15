'use client';

import { ToolForm } from '@/components/ToolForm';

export default function LabSafetyPage() {
    return (
        <ToolForm
            toolId="lab-safety"
            fields={[
                { name: 'experiment', label: 'Experiment Details', type: 'textarea', placeholder: 'e.g., Elephant Toothpaste / Mixing Acid & Base', required: true },
                { name: 'grade', label: 'Grade Level', type: 'text', placeholder: 'e.g., Grade 8', required: true }
            ]}
        />
    );
}
