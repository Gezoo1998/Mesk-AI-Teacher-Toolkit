'use client';

import { ToolForm } from '@/components/ToolForm';

export default function IcebreakersPage() {
    return (
        <ToolForm
            toolId="icebreakers"
            fields={[
                { name: 'goal', label: 'Activity Goal', type: 'text', placeholder: 'e.g., Energy Boost / Team Building', required: true },
                { name: 'class_size', label: 'Class Size', type: 'text', placeholder: 'e.g., 25 students', required: true },
                { name: 'time', label: 'Time Available', type: 'text', placeholder: 'e.g., 10 minutes', required: true }
            ]}
        />
    );
}
