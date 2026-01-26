'use client';

import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-sky-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.language-dialogue.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.language-dialogue.description')}</p>
            </header>

            <ToolForm
                toolId="language-dialogue"
                fields={[
                    {
                        name: 'language',
                        label: t('common.targetLanguageLabel'),
                        type: 'select',
                        options: ['French', 'German', 'Spanish', 'Italian', 'English'],
                        required: true
                    },
                    {
                        name: 'scenario',
                        label: t('common.scenarioLabel'),
                        placeholder: t('common.scenarioPlaceholder'),
                        required: true
                    },
                    {
                        name: 'level',
                        label: t('common.proficiencyLabel'),
                        type: 'select',
                        options: ['Beginner (A1)', 'Elementary (A2)', 'Intermediate (B1)', 'Upper Intermediate (B2)', 'Advanced (C1)'],
                        required: true
                    },
                ]}
            />
        </div>
    );
}
