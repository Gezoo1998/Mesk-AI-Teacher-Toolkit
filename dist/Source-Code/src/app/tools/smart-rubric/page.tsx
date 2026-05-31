'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from '@/components/ToolForm';
import { GRADE_LEVELS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SmartRubricPage() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="smart-rubric" />

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
