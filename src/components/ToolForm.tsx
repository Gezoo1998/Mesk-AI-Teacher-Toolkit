'use client';

import { useState, useTransition } from 'react';
import { generateToolOutput } from '@/app/actions';
import { OutputDisplay } from './OutputDisplay';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface GenericField {
    name: string;
    label: string;
    type?: 'text' | 'number' | 'textarea' | 'select';
    placeholder?: string;
    options?: (string | { value: string; label: string })[]; // for select
    required?: boolean;
}

interface ToolFormProps {
    toolId: string;
    fields: GenericField[];
    title?: string;
    description?: string;
}

export function ToolForm({ toolId, fields, title, description }: ToolFormProps) {
    const [searchStatus, setSearchStatus] = useState<string>('');
    const [isSearching, setIsSearching] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [output, setOutput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { preferences, updatePreference, isLoaded } = useUserPreferences();
    const { language, t } = useLanguage();

    const handleSubmit = async (formData?: FormData, refineType?: string, currentContent?: string) => {
        setError(null);

        let data: FormData;
        if (formData) {
            data = formData;
        } else {
            const form = document.querySelector('form') as HTMLFormElement;
            data = new FormData(form);
        }

        const topic = (data.get('lesson_title') || data.get('topic') || '') as string;
        const subject = data.get('subject') as string;
        const grade = data.get('grade') as string;

        // Save preferences if fields exist
        if (subject) updatePreference('subject', subject);
        if (grade) updatePreference('grade', grade);

        // Inject language
        data.append('language', language);

        if (refineType) {
            data.append('refineType', refineType);
        }
        if (currentContent) {
            data.append('currentContent', currentContent);
        }

        // Show searching sequence if it's a new generation
        const curriculumTools = ['lesson-planner', 'question-generator', 'activities', 'lesson-ideas', 'math-problems', 'pbl-planner', 'math-real-world'];
        if (!refineType && curriculumTools.includes(toolId)) {
            setIsSearching(true);

            // Step 1: Google Search
            setSearchStatus(t('common.searchGoogle').replace('{{topic}}', topic));
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Step 2: Bilingual Comparison
            setSearchStatus(t('common.searchBilingual'));
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Step 3: Found on MoETE
            setSearchStatus(t('common.searchFound'));
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Step 4: Extracting
            setSearchStatus(t('common.searchExtracting'));
            await new Promise(resolve => setTimeout(resolve, 1000));

            setIsSearching(false);
        }

        startTransition(async () => {
            const result = await generateToolOutput(data);
            if (result.success && result.content) {
                setOutput(result.content);
            } else {
                setError(result.error || t('common.somethingWentWrong'));
            }
        });
    };

    const handleRefine = (refineType: string) => {
        if (!output) return;
        handleSubmit(undefined, refineType, output);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    // Don't render until preferences are loaded to ensure defaultValues work
    if (!isLoaded) return <div className="p-10 text-center text-sm text-zinc-400">{t('common.loading')}</div>;

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-2xl border border-white/50 relative overflow-hidden"
            >
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

                {(title || description) && (
                    <div className="mb-8 border-b border-amber-100/50 pb-6 relative z-10">
                        {title && <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">{title}</h2>}
                        {description && <p className="mt-2 text-zinc-600 font-medium">{description}</p>}
                    </div>
                )}

                <form action={handleSubmit} className="space-y-6 relative z-10">
                    <input type="hidden" name="toolId" value={toolId} />

                    {fields.map((field) => {
                        // Auto-fill logic
                        let defaultValue = '';
                        if (field.name === 'subject') defaultValue = preferences.subject;
                        if (field.name === 'grade') defaultValue = preferences.grade;

                        return (
                            <motion.div key={field.name} variants={itemVariants}>
                                <label htmlFor={field.name} className="block text-sm font-bold text-zinc-700 mb-2 ml-1">
                                    {field.label}
                                    {field.required && <span className="text-rose-500 ml-1">*</span>}
                                </label>

                                {field.type === 'select' ? (
                                    <div className="relative">
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            required={field.required}
                                            defaultValue={defaultValue || ""}
                                            className="w-full appearance-none rounded-2xl border-0 bg-white/60 px-5 py-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 transition-all focus:ring-2 focus:ring-amber-500 hover:bg-white/80"
                                        >
                                            <option value="">{t('common.select')}</option>
                                            {field.options?.map((opt, idx) => {
                                                const value = typeof opt === 'string' ? opt : opt.value;
                                                const label = typeof opt === 'string' ? opt : opt.label;
                                                return (
                                                    <option key={`${field.name}-${idx}`} value={value}>
                                                        {label}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
                                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                                        </div>
                                    </div>
                                ) : field.type === 'textarea' ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        rows={4}
                                        defaultValue={defaultValue}
                                        className="w-full rounded-2xl border-0 bg-white/60 px-5 py-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 transition-all focus:ring-2 focus:ring-amber-500 hover:bg-white/80 placeholder:text-zinc-400 resize-none"
                                    />
                                ) : (
                                    <input
                                        id={field.name}
                                        type={field.type || 'text'}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        defaultValue={defaultValue}
                                        className="w-full rounded-2xl border-0 bg-white/60 px-5 py-4 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-200 transition-all focus:ring-2 focus:ring-amber-500 hover:bg-white/80 placeholder:text-zinc-400"
                                    />
                                )}
                            </motion.div>
                        );
                    })}

                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isPending || isSearching}
                        className="w-full min-h-11 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:shadow-amber-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSearching ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                <span>{searchStatus}</span>
                            </>
                        ) : isPending ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                <span>{t('common.generatingMagic')}</span>
                            </>
                        ) : (
                            <>
                                <span className="text-lg">✨</span>
                                <span>{t('common.generateContent')}</span>
                            </>
                        )}
                    </motion.button>
                </form>

                {error && (
                    <div className="mt-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600 animate-fadeIn">
                        {error}
                    </div>
                )}
            </motion.div>

            {output && (
                <div className="mt-8 animate-slide-up">
                    <OutputDisplay content={output} onRefine={handleRefine} />
                </div>
            )}
        </div>
    );
}
