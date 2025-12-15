'use client';

import { ToolForm } from '@/components/ToolForm';

export default function VocabStoryPage() {
    return (
        <ToolForm
            toolId="vocab-story"
            fields={[
                { name: 'words', label: 'Vocabulary List', type: 'textarea', placeholder: 'e.g., photosynthesis, energy, green, sun', required: true },
                { name: 'grade', label: 'Grade Level', type: 'text', placeholder: 'e.g., Grade 5', required: true },
                { name: 'theme', label: 'Story Theme', type: 'text', placeholder: 'e.g., A funny space adventure', required: false }
            ]}
        />
    );
}
