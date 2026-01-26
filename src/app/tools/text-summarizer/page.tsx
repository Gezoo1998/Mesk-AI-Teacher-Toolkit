'use client';

import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.text-summarizer.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.text-summarizer.description')}</p>
            </header>

            <ToolForm
                toolId="text-summarizer"
                fields={[
                    { name: 'input_text', label: t('common.summarizeLabel'), type: 'textarea', placeholder: t('common.summarizePlaceholder'), required: true },
                ]}
            />
        </div>
    );
}
