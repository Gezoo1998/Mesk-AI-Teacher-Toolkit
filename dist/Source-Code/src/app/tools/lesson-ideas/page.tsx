'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS, SUBJECT_OPTIONS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();
    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="lesson-ideas" />

            <ToolForm
                toolId="lesson-ideas"
                fields={[
                    { name: 'lesson_title', label: t('common.lessonTitleLabel'), type: 'text', placeholder: t('common.topicPlaceholder'), required: true },
                    { name: 'subject', label: t('common.subjectLabel'), type: 'select', options: SUBJECT_OPTIONS, required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                ]}
            />
        </div>
    );
}
