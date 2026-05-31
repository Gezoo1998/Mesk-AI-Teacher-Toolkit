'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from '@/components/ToolForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { GRADE_LEVELS } from '@/lib/constants';

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="math-proof-assistant" />

            <ToolForm
                toolId="math-proof-assistant"
                fields={[
                    { name: 'concept', label: t('common.mathConceptLabel'), type: 'text', placeholder: t('common.proofPlaceholder'), required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'type', label: t('common.proofTypeLabel'), type: 'select', options: ['Geometry Proof', 'Algebra Proof', 'Calculus Proof', 'General Derivation'], required: true },
                ]}
            />
        </div>
    );
}