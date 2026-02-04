'use client';

import { ToolForm } from "@/components/ToolForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MultimediaGeneratorPage() {
    const { t } = useLanguage();

    const fields = [
        {
            name: 'topic',
            label: t('common.topicLabel'),
            type: 'text' as const,
            placeholder: t('common.topicPlaceholder'),
            required: true
        },
        {
            name: 'grade',
            label: t('common.gradeLabel'),
            type: 'select' as const,
            options: [
                { value: 'primary', label: t('common.primary') },
                { value: 'prep', label: t('common.prep') },
                { value: 'secondary', label: t('common.secondary') }
            ],
            required: true
        },
        {
            name: 'content_type',
            label: t('tools.multimedia-generator.contentTypeLabel'),
            type: 'select' as const,
            options: [
                { value: 'Presentation Slides', label: t('tools.multimedia-generator.presentationSlides') },
                { value: 'Educational Image Prompts', label: t('tools.multimedia-generator.imagePrompts') },
                { value: 'Short Educational Video Script', label: t('tools.multimedia-generator.videoScript') }
            ],
            required: true
        },
        {
            name: 'visual_style',
            label: t('tools.multimedia-generator.visualStyleLabel'),
            type: 'select' as const,
            options: [
                { value: 'Modern & Clean', label: t('tools.multimedia-generator.styleModern') },
                { value: 'Colorful & Engaging', label: t('tools.multimedia-generator.styleEngaging') },
                { value: 'Formal & Professional', label: t('tools.multimedia-generator.styleProfessional') }
            ],
            required: true
        }
    ];

    return (
        <ToolForm
            toolId="multimedia-generator"
            title={t('tools.multimedia-generator.title')}
            description={t('tools.multimedia-generator.description')}
            fields={fields}
        />
    );
}
