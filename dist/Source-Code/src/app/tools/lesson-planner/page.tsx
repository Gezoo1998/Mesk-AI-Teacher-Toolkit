'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS, SUBJECT_OPTIONS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();
    const toolId = 'lesson-planner';

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId={toolId} />

            <ToolForm
                toolId={toolId}
                fields={[
                    { name: 'lesson_title', label: t('common.lessonTitleLabel'), type: 'text', placeholder: t('common.topicPlaceholder'), required: true },
                    { name: 'subject', label: t('common.subjectLabel'), type: 'select', options: SUBJECT_OPTIONS, required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'duration', label: t('common.durationLabel'), type: 'select', options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'], required: true },
                    { name: 'curriculum_standard', label: t('tools.lesson-planner.standardLabel') || 'Curriculum Standard (optional)', type: 'text', placeholder: t('common.standardPlaceholder'), required: false },
                ]}
            />
        </div>
    );
}
