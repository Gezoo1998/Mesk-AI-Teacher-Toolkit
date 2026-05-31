'use client';

import { ToolHeader } from "@/components/ToolHeader";
import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRADE_LEVELS } from "@/lib/constants";

export default function Page() {
    const { t } = useLanguage();
    const toolId = 'concept-mystery';

    return (
        <div className="flex flex-col gap-6">
            <ToolHeader toolId={toolId} />

            <ToolForm
                toolId={toolId}
                fields={[
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'topic', label: t('common.topicLabel'), type: 'text', placeholder: t('common.topicPlaceholder'), required: true },
                    { name: 'mysterySetting', label: t('common.mysterySettingLabel'), type: 'text', placeholder: 'e.g. A space station, a medieval castle, the deep ocean...', required: false },
                ]}
            />
        </div>
    );
}
