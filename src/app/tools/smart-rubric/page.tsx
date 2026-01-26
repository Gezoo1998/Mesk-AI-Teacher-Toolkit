'use client';

import { ToolForm } from '@/components/ToolForm';
import { GRADE_LEVELS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SmartRubricPage() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.smart-rubric.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.smart-rubric.description')}</p>
            </header>

            <ToolForm
                toolId="smart-rubric"
                fields={[
                    { name: 'title', label: t('common.assignmentTitleLabel'), type: 'text', placeholder: t('common.topicPlaceholder'), required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'description', label: t('common.assignmentDescLabel'), type: 'textarea', placeholder: t('common.rubricPlaceholder'), required: true }
                ]}
            />
        </div>
    );
}
