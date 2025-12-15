'use client';

import { ToolForm } from '@/components/ToolForm';

export default function GamifyLessonPage() {
    return (
        <ToolForm
            toolId="gamify-lesson"
            fields={[
                { name: 'topic', label: 'Lesson Topic', type: 'text', placeholder: 'e.g., Parts of Speech', required: true },
                { name: 'grade', label: 'Grade Level', type: 'text', placeholder: 'e.g., Grade 3', required: true },
                { name: 'style', label: 'Preferred Game Style', type: 'text', placeholder: 'e.g., Jeopardy / Scavenger Hunt / Card Game', required: false }
            ]}
        />
    );
}
