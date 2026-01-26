'use client';

import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.math-problems.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.math-problems.description')}</p>
            </header>

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
                        options: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Prep 1', 'Prep 2', 'Prep 3'],
                        required: true
                    },
                ]}
            />
        </div>
    );
}
