'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="text-summarizer" />

            <ToolForm
                toolId="text-summarizer"
                fields={[
                    { name: 'input_text', label: t('common.summarizeLabel'), type: 'textarea', placeholder: t('common.summarizePlaceholder'), required: true },
                ]}
            />
        </div>
    );
}
