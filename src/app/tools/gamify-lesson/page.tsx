'use client';

import { ToolForm } from '@/components/ToolForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { GRADE_LEVELS } from '@/lib/constants';

export default function Page() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-amber-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.gamify-lesson.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.gamify-lesson.description')}</p>
            </header>

            <ToolForm
                toolId="gamify-lesson"
                fields={[
                    { name: 'topic', label: t('common.topicLabel'), type: 'text', placeholder: t('common.topicLabel'), required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'style', label: t('common.gameStyleLabel'), type: 'select', options: ['Jeopardy', 'Scavenger Hunt', 'Card Game', 'Relay Race', 'Escape Room', 'Trivia', 'Board Game'], required: true }
                ]}
            />
        </div>
    );
}
