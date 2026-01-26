'use client';

import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
    const { t } = useLanguage();
    const toolId = 'lesson-planner';

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t(`tools.${toolId}.title`)}</h2>
                <p className="text-sm text-zinc-600">{t(`tools.${toolId}.description`)}</p>
            </header>

            <ToolForm
                toolId={toolId}
                fields={[
                    { name: 'lesson_title', label: t('common.lessonTitleLabel'), type: 'text', placeholder: t('common.topicPlaceholder'), required: true },
                    { name: 'subject', label: t('common.subjectLabel'), type: 'select', options: ['English', 'Math', 'Science', 'History', 'Geography', 'Arabic', 'Religion'], required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Prep 1', 'Prep 2', 'Prep 3', 'Secondary 1', 'Secondary 2', 'Secondary 3'], required: true },
                    { name: 'duration', label: t('common.durationLabel'), type: 'select', options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'], required: true },
                    { name: 'curriculum_standard', label: t('tools.lesson-planner.standardLabel') || 'Curriculum Standard (optional)', type: 'text', placeholder: t('common.standardPlaceholder'), required: false },
                ]}
            />
        </div>
    );
}
