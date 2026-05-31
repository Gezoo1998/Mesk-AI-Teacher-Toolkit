'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="math-problems" />

            <ToolForm
                toolId="math-problems"
                fields={[
                    {
                        name: 'subject_type',
                        label: t('common.subjectLabel'),
                        type: 'select',
                        options: ['Math', 'Science'],
                        required: true
                    },
                    {
                        name: 'topic',
                        label: t('common.topicLabel'),
                        placeholder: t('common.topicPlaceholder'),
                        required: true
                    },
                    {
                        name: 'difficulty',
                        label: t('common.difficultyLabel'),
                        type: 'select',
                        options: ['Easy', 'Medium', 'Hard', 'Challenge'],
                        required: true
                    },
                    {
                        name: 'count',
                        label: t('common.countLabel'),
                        type: 'number',
                        placeholder: '5',
                        required: true
                    },
                    {
                        name: 'grade',
                        label: t('common.gradeLabel'),
                        type: 'select',
                        options: GRADE_LEVELS,
                        required: true
                    },
                ]}
            />
        </div>
    );
}
