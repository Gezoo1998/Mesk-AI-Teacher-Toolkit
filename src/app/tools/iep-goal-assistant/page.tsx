'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS, SUBJECT_OPTIONS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();
    const toolId = 'iep-goal-assistant';

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId={toolId} />

            <ToolForm
                toolId={toolId}
                fields={[
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'subject', label: t('common.subjectLabel'), type: 'select', options: SUBJECT_OPTIONS, required: true },
                    { name: 'studentNeeds', label: t('common.studentNeedsLabel'), type: 'textarea', placeholder: 'Describe the student\'s challenges, strengths, and current levels...', required: true },
                ]}
            />
        </div>
    );
}
