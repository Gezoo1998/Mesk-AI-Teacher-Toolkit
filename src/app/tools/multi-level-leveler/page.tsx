'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();
    const toolId = 'multi-level-leveler';

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId={toolId} />

            <ToolForm
                toolId={toolId}
                fields={[
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'readingText', label: t('common.readingTextLabel'), type: 'textarea', placeholder: 'Paste the text you want to level for different abilities...', required: true },
                ]}
            />
        </div>
    );
}
