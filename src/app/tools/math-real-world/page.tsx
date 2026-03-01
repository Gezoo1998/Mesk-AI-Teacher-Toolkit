'use client';

import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-amber-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.math-real-world.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.math-real-world.description')}</p>
            </header>

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
