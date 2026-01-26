'use client';

import { ToolForm } from '@/components/ToolForm';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-rose-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.lab-safety.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.lab-safety.description')}</p>
            </header>

            <ToolForm
                toolId="lab-safety"
                fields={[
                    { name: 'experiment', label: t('common.experimentLabel'), type: 'textarea', placeholder: t('common.experimentPlaceholder'), required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Prep 1', 'Prep 2', 'Prep 3', 'Secondary 1', 'Secondary 2', 'Secondary 3'], required: true }
                ]}
            />
        </div>
    );
}
