'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="language-grammar" />

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
