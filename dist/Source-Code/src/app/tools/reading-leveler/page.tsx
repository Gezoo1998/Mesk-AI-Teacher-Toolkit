'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from '@/components/ToolForm';
import { GRADE_LEVELS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ReadingLevelerPage() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="reading-leveler" />

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
