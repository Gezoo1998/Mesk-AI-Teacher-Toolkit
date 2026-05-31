'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();
    const toolId = 'concept-to-code';

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId={toolId} />

            <ToolForm
                toolId={toolId}
                fields={[
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'programmingLang', label: t('common.programmingLangLabel'), type: 'select', options: ['Python', 'Scratch'], required: true },
                    { name: 'logicDescription', label: t('common.logicDescriptionLabel'), type: 'textarea', placeholder: 'e.g. A program that asks for your age and tells you if you can vote...', required: true },
                ]}
            />
        </div>
    );
}
