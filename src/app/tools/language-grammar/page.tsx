'use client';

import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-indigo-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.language-grammar.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.language-grammar.description')}</p>
            </header>

            <ToolForm
                toolId="language-grammar"
                fields={[
                    {
                        name: 'language',
                        label: t('common.targetLanguageLabel'),
                        type: 'select',
                        options: ['French', 'German', 'Spanish', 'Italian', 'English'],
                        required: true
                    },
                    {
                        name: 'grammar_point',
                        label: t('common.grammarRuleLabel'),
                        placeholder: t('common.grammarPointPlaceholder'),
                        required: true
                    },
                    {
                        name: 'theme',
                        label: t('common.storyThemeLabel'),
                        placeholder: t('common.storyThemePlaceholder'),
                        required: true
                    },
                ]}
            />
        </div>
    );
}
