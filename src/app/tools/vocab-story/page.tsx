'use client';

import { ToolForm } from '@/components/ToolForm';
import { GRADE_LEVELS } from '@/lib/constants';
import { useLanguage } from '@/contexts/LanguageContext';

export default function VocabStoryPage() {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6">
            <header className="border-b border-yellow-100 pb-4">
                <h2 className="text-xl font-semibold text-zinc-900">{t('tools.vocab-story.title')}</h2>
                <p className="text-sm text-zinc-600">{t('tools.vocab-story.description')}</p>
            </header>

            <ToolForm
                toolId="vocab-story"
                fields={[
                    { name: 'words', label: t('common.vocabListLabel'), type: 'textarea', placeholder: t('common.summarizePlaceholder'), required: true },
                    { name: 'grade', label: t('common.gradeLabel'), type: 'select', options: GRADE_LEVELS, required: true },
                    { name: 'theme', label: t('common.storyThemeLabel'), type: 'text', placeholder: t('common.storyThemePlaceholder'), required: false }
                ]}
            />
        </div>
    );
}
