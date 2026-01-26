'use client';

import { ToolForm } from '@/components/ToolForm';
import { GRADE_LEVELS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ReadingLevelerPage() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.reading-leveler.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.reading-leveler.description')}</p>
            </header>

            <ToolForm
                toolId="reading-leveler"
                fields={[
                    { name: 'text', label: t('common.rewriteLabel'), type: 'textarea', placeholder: t('common.topicPlaceholder'), required: true },
                    { name: 'grade', label: t('common.targetGradeLabel'), type: 'select', options: GRADE_LEVELS, required: true }
                ]}
            />
        </div>
    );
}
