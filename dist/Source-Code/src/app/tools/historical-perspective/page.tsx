'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from '@/components/ToolForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { GRADE_LEVELS } from '@/lib/constants';

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="historical-perspective" />

            <ToolForm
                toolId="historical-perspective"
                fields={[
                    { name: 'event', label: t('common.historicalEventLabel'), type: 'text', placeholder: t('common.historicalEventPlaceholder'), required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'perspectives', label: t('common.perspectivesLabel'), type: 'select', options: ['2', '3', '4', '5'], required: true },
                ]}
            />
        </div>
    );
}