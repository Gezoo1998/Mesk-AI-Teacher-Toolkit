'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from '@/components/ToolForm';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId="icebreakers" />

            <ToolForm
                toolId="icebreakers"
                fields={[
                    { name: 'class_size', label: t('common.classSizeLabel'), type: 'select', options: ['10-15 students', '15-25 students', '25-35 students', '35+ students'], required: true },
                    { name: 'time', label: t('common.timeAvailableLabel'), type: 'select', options: ['5 minutes', '10 minutes', '15 minutes', '20 minutes'], required: true },
                    { name: 'goal', label: t('common.activityGoalLabel'), type: 'select', options: ['Get to know each other', 'Energy boost', 'Team building', 'Focus and calm'], required: true }
                ]}
            />
        </div>
    );
}
