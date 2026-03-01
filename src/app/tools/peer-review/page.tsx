'use client';

import { ToolForm } from '@/components/ToolForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { GRADE_LEVELS } from '@/lib/constants';

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.peer-review.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.peer-review.description')}</p>
            </header>

            <ToolForm
                toolId="peer-review"
                fields={[
                    { name: 'assignment', label: t('common.assignmentTypeLabel'), type: 'text', placeholder: t('common.topicPlaceholder'), required: true },
                    { name: 'subject', label: t('common.subjectLabel'), type: 'select', options: ['English', 'Math', 'Science', 'History', 'Geography', 'Arabic', 'Religion'], required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                ]}
            />
        </div>
    );
}