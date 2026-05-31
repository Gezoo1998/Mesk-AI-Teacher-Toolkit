'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from '@/components/ToolForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { GRADE_LEVELS } from '@/lib/constants';

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="debate-spark" />

            <ToolForm
                toolId="debate-spark"
                fields={[
                    { name: 'topic', label: t('common.topicLabel'), type: 'text', placeholder: t('common.topicPlaceholder'), required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true }
                ]}
            />
        </div>
    );
}
