'use client';

import { ToolForm } from '@/components/ToolForm';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.math-proof-assistant.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.math-proof-assistant.description')}</p>
            </header>

            <ToolForm
                toolId="math-proof-assistant"
                fields={[
                    { name: 'concept', label: t('common.mathConceptLabel'), type: 'text', placeholder: t('common.proofPlaceholder'), required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6', 'Prep 1', 'Prep 2', 'Prep 3', 'Secondary 1', 'Secondary 2', 'Secondary 3'], required: true },
                    { name: 'type', label: t('common.proofTypeLabel'), type: 'select', options: ['Geometry Proof', 'Algebra Proof', 'Calculus Proof', 'General Derivation'], required: true },
                ]}
            />
        </div>
    );
}