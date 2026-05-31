'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="math-real-world" />

            <ToolForm
                toolId="math-real-world"
                fields={[
                    {
                        name: 'topic',
                        label: t('common.mathConceptLabel'),
                        placeholder: t('common.topicPlaceholder'),
                        required: true
                    },
                    {
                        name: 'interests',
                        label: t('common.interestsLabel'),
                        placeholder: t('common.interestsPlaceholder'),
                        required: false
                    },
                    {
                        name: 'grade',
                        label: t('common.gradeLabel'),
                        type: 'select',
                        options: GRADE_LEVELS,
                        required: true
                    },
                ]}
            />
        </div>
    );
}
