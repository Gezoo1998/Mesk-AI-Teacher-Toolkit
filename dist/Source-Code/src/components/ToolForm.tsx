import { useState, useRef } from 'react';
import { OutputDisplay } from './OutputDisplay';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { TOOLS } from '@/lib/data/tools';
import { cn } from '@/lib/utils';

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

const colorStyles = {
    amber: "ring-amber-500/10 hover:border-amber-400/50 hover:shadow-amber-500/10",
    emerald: "ring-emerald-500/10 hover:border-emerald-400/50 hover:shadow-emerald-500/10",
    sky: "ring-sky-500/10 hover:border-sky-400/50 hover:shadow-sky-500/10",
    purple: "ring-purple-500/10 hover:border-purple-400/50 hover:shadow-purple-500/10",
    rose: "ring-rose-500/10 hover:border-rose-400/50 hover:shadow-rose-500/10",
    indigo: "ring-indigo-500/10 hover:border-indigo-400/50 hover:shadow-indigo-500/10",
    slate: "ring-slate-500/10 hover:border-slate-400/50 hover:shadow-slate-500/10",
};

export function ToolForm({ toolId, fields, title, description }: ToolFormProps) {
    const [searchStatus, setSearchStatus] = useState<string>('');
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeDiff, setActiveDiff] = useState<string>('none');
    const [output, setOutput] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { preferences, updatePreference, isLoaded } = useUserPreferences();
    const { language, t } = useLanguage();
    const tool = TOOLS.find(t => t.id === toolId);
    
    // Interaction logic
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const spotlightX = useSpring(useTransform(mouseX, [0, 1], [-100, 100]), { stiffness: 150, damping: 20 });
    const spotlightY = useSpring(useTransform(mouseY, [0, 1], [-100, 100]), { stiffness: 150, damping: 20 });
    const xPct = useTransform(spotlightX, (v) => `${(v as number) + 50}%`);
    const yPct = useTransform(spotlightY, (v) => `${(v as number) + 50}%`);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        mouseX.set(x);
        mouseY.set(y);
    };

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

        if (subject) updatePreference('subject', subject);
        if (grade) updatePreference('grade', grade);

        data.append('language', language);
        if (refineType) data.append('refineType', refineType);
        if (currentContent) data.append('currentContent', currentContent);

        const curriculumTools = ['lesson-planner', 'question-generator', 'activities', 'lesson-ideas', 'math-problems', 'pbl-planner', 'math-real-world'];
        if (!refineType && curriculumTools.includes(toolId)) {
            setIsSearching(true);
            setSearchStatus(t('common.searchGoogle').replace('{{topic}}', topic));
            await new Promise(resolve => setTimeout(resolve, 800));
            setSearchStatus(t('common.searchBilingual'));
            await new Promise(resolve => setTimeout(resolve, 600));
            setSearchStatus(t('common.searchFound'));
            await new Promise(resolve => setTimeout(resolve, 500));
            setSearchStatus(t('common.searchExtracting'));
            await new Promise(resolve => setTimeout(resolve, 500));
            setIsSearching(false);
        }

        setIsLoading(true);
        setError(null);
        setOutput(''); // Clear previous output for stream

        const payload: Record<string, unknown> = {};
        data.forEach((value, key) => payload[key] = value);

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toolId,
                    payload,
                    language
                })
            });

            if (!response.ok) throw new Error('Generation failed');

            const reader = response.body?.getReader();
            if (!reader) throw new Error('No reader available');

            let accumulated = '';
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                const chunk = new TextDecoder().decode(value);
                accumulated += chunk;
                setOutput(accumulated);
            }

            // After stream is done, try to parse and update parent with structured data
            try {
                const cleanJson = accumulated.replace(/```json\n?|\n?```/g, '').trim();
                JSON.parse(cleanJson);
                // OutputDisplay handles raw content if it's JSON
                setOutput(accumulated);
            } catch {
                // Not JSON, that's fine
            }
        } catch (err: unknown) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage || t('common.somethingWentWrong'));
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefine = (refineType: string) => {
        if (!output) return;
        handleSubmit(undefined, refineType, output);
    };

    if (!isLoaded) return <div className="p-10 text-center text-sm text-zinc-400">{t('common.loading')}</div>;

    const themeColor = tool?.color || 'slate';

    return (
        <div className="w-full max-w-2xl mx-auto">
            <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                    "relative overflow-hidden bg-white rounded-[2.5rem] p-6 md:p-10 transition-all duration-500",
                    "border-2 border-zinc-100",
                    "shadow-[0_20px_50px_rgba(0,0,0,0.08)] shadow-zinc-200/50",
                    colorStyles[themeColor]
                )}
            >
                {/* Spotlight Layer */}
                <motion.div 
                    className={cn(
                        "absolute inset-0 pointer-events-none opacity-[0.08] transition-opacity duration-500",
                        "bg-[radial-gradient(circle_at_var(--x)_var(--y),var(--color),transparent_60%)]",
                        tool?.color === 'amber' && "[--color:#f59e0b]",
                        tool?.color === 'emerald' && "[--color:#10b981]",
                        tool?.color === 'sky' && "[--color:#0ea5e9]",
                        tool?.color === 'purple' && "[--color:#a855f7]",
                        tool?.color === 'rose' && "[--color:#f43f5e]",
                        tool?.color === 'indigo' && "[--color:#6366f1]",
                        tool?.color === 'slate' && "[--color:#475569]"
                    )}
                    style={{ 
                        "--x": xPct,
                        "--y": yPct
                    } as React.CSSProperties}
                />

                {(title || description) && (
                    <div className="mb-10 relative z-10">
                        {title && <h2 className="text-2xl font-black text-zinc-900 tracking-tight">{title}</h2>}
                        {description && <p className="mt-2 text-zinc-500 font-semibold leading-relaxed">{description}</p>}
                        <div className="mt-6 h-px w-full bg-zinc-100" />
                    </div>
                )}

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="space-y-8 relative z-10"
                >
                    <input type="hidden" name="toolId" value={toolId} />

                    {fields.map((field, idx) => {
                        let defaultValue = '';
                        if (field.name === 'subject') defaultValue = preferences.subject;
                        if (field.name === 'grade') defaultValue = preferences.grade;

                        return (
                            <motion.div 
                                key={field.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + (idx * 0.05) }}
                            >
                                <label htmlFor={field.name} className="block text-xs font-black text-zinc-400 uppercase tracking-[0.2em] mb-3 ml-1">
                                    {field.label}
                                    {field.required && <span className="text-rose-500 ml-1.5">*</span>}
                                </label>

                                {field.type === 'select' ? (
                                    <div className="relative group/field">
                                        <select
                                            id={field.name}
                                            name={field.name}
                                            required={field.required}
                                            defaultValue={defaultValue || ""}
                                            className="w-full appearance-none rounded-2xl border-2 border-zinc-50 bg-zinc-50/30 px-6 py-4.5 text-zinc-900 font-bold shadow-sm transition-all focus:border-amber-500/30 focus:bg-white focus:ring-4 focus:ring-amber-500/5 hover:border-zinc-200"
                                        >
                                            <option value="">{t('common.select')}</option>
                                            {field.options?.map((opt, idx) => {
                                                const value = typeof opt === 'string' ? opt : opt.value;
                                                let label = typeof opt === 'string' ? opt : opt.label;
                                                if (field.name === 'grade') {
                                                    const translatedGrade = t(`common.grades.${value}`);
                                                    if (translatedGrade !== `common.grades.${value}`) label = translatedGrade;
                                                } else if (field.name === 'difficulty') {
                                                    const translatedDiff = t(`common.difficulty.${value}`);
                                                    if (translatedDiff !== `common.difficulty.${value}`) label = translatedDiff;
                                                } else if (field.name === 'subject') {
                                                    const translatedSub = t(`common.subjects.${value}`);
                                                    if (translatedSub !== `common.subjects.${value}`) label = translatedSub;
                                                }
                                                return <option key={`${field.name}-${idx}`} value={value}>{label}</option>;
                                            })}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-zinc-400">
                                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.229 7.72a.75.75 0 011.06 0L10 11.439l3.711-3.72a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.229 8.78a.75.75 0 010-1.06z" clipRule="evenodd" /></svg>
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
                                        className="w-full rounded-2xl border-2 border-zinc-50 bg-zinc-50/30 px-6 py-4 text-zinc-900 font-semibold shadow-sm transition-all focus:border-amber-500/30 focus:bg-white focus:ring-4 focus:ring-amber-500/5 hover:border-zinc-200 placeholder:text-zinc-400 resize-none"
                                    />
                                ) : (
                                    <input
                                        id={field.name}
                                        type={field.type || 'text'}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        required={field.required}
                                        defaultValue={defaultValue}
                                        className="w-full rounded-2xl border-2 border-zinc-50 bg-zinc-50/30 px-6 py-4.5 text-zinc-900 font-bold shadow-sm transition-all focus:border-amber-500/30 focus:bg-white focus:ring-4 focus:ring-amber-500/5 hover:border-zinc-200 placeholder:text-zinc-400"
                                    />
                                )}
                            </motion.div>
                        );
                    })}

                    {/* Global Differentiation Toggle */}
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-5 rounded-2xl border-2 border-zinc-50 bg-zinc-50/20"
                    >
                        <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-4 ml-1">
                            {t('common.differentiationLabel') || 'Learning Differentiation'}
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'none', label: t('common.none') || 'None', color: 'slate' },
                                { id: 'support', label: t('common.support') || 'Support', color: 'emerald' },
                                { id: 'standard', label: t('common.standard') || 'Standard', color: 'amber' },
                                { id: 'challenge', label: t('common.challenge') || 'Challenge', color: 'rose' }
                            ].map((level) => (
                                <button
                                    key={level.id}
                                    type="button"
                                    onClick={() => setActiveDiff(level.id)}
                                    className={cn(
                                        "flex-1 min-w-[100px] py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2",
                                        activeDiff === level.id
                                            ? level.id === 'none'
                                                ? "border-zinc-300 bg-zinc-100 text-zinc-600"
                                                : level.id === 'support'
                                                ? "bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20"
                                                : level.id === 'standard'
                                                ? "bg-amber-500 text-white border-amber-500 shadow-md shadow-amber-500/20"
                                                : "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20"
                                            : "border-zinc-100 bg-white text-zinc-400 hover:border-zinc-200"
                                    )}
                                >
                                    {level.label}
                                </button>
                            ))}
                        </div>
                        <input type="hidden" name="differentiation" value={activeDiff === 'none' ? '' : activeDiff} />
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.01, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading || isSearching}
                        className={cn(
                            "group relative w-full h-[64px] overflow-hidden rounded-[20px] transition-all duration-300",
                            "bg-gradient-to-r from-zinc-900 to-zinc-800 text-white font-black uppercase tracking-[0.2em] text-xs",
                            "shadow-xl shadow-zinc-900/10 hover:shadow-zinc-900/20 disabled:opacity-70 disabled:grayscale disabled:cursor-not-allowed"
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 flex items-center justify-center gap-3">
                            {isSearching ? (
                                <>
                                    <div className="h-5 w-5 animate-spin rounded-full border-3 border-white/30 border-t-white" />
                                    <span>{searchStatus}</span>
                                </>
                            ) : isLoading ? (
                                <>
                                    <div className="h-5 w-5 animate-spin rounded-full border-3 border-white/30 border-t-white" />
                                    <span>{t('common.generatingMagic')}</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-xl">✨</span>
                                    <span>{t('common.generateContent')}</span>
                                </>
                            )}
                        </div>
                    </motion.button>
                </form>

                {error && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-8 rounded-2xl border-2 border-rose-100 bg-rose-50/50 p-5 text-sm font-bold text-rose-600 flex items-center gap-3"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {error}
                    </motion.div>
                )}
            </motion.div>

            {output && (
                <div className="mt-12 animate-slide-up">
                    <OutputDisplay content={output} onRefine={handleRefine} />
                </div>
            )}
        </div>
    );
}
