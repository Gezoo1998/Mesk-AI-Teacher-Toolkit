'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { StructuredResponse } from '@/lib/ai/types';
import { APP_CONFIG } from '@/config/app';

export function OutputDisplay({ content, onRefine }: { content: string; onRefine?: (type: string) => void }) {
    const [copied, setCopied] = useState(false);
    const [showRefine, setShowRefine] = useState(false);
    const [isExporting, setIsExporting] = useState<'pdf' | 'docx' | null>(null);
    const { t, language } = useLanguage();
    const isRtl = language === 'ar';

    // Try to parse structured content
    let structured: StructuredResponse | null = null;
    try {
        const cleanJson = content.replace(/```json\n?|\n?```/g, '').trim();
        structured = JSON.parse(cleanJson);
    } catch {
        // Not JSON
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExportPDF = async () => {
        const element = document.getElementById('output-document');
        if (!element || isExporting) return;

        console.log('[PDF Export] Starting export process...');
        setIsExporting('pdf');

        try {
            // Wait a moment for UI to settle
            console.log('[PDF Export] Waiting for UI to settle (100ms)...');
            await new Promise(resolve => setTimeout(resolve, 100));

            console.group('[PDF Export] Library Loading');
            console.log('[PDF Export] Loading jsPDF...');
            const jsPDF = (await import('jspdf')).default;
            console.log('[PDF Export] Loading html2canvas...');
            const html2canvas = (await import('html2canvas')).default;
            console.groupEnd();

            console.log('[PDF Export] Capturing element with html2canvas...', {
                width: element.scrollWidth,
                height: element.scrollHeight
            });
            const canvas = await html2canvas(element, {
                scale: 1.5,
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight,
                onclone: (clonedDoc) => {
                    console.log('[PDF Export] Sanitizing styles in cloned document...');
                    const clonedElement = clonedDoc.getElementById('output-document');
                    if (!clonedElement || !element) return;

                    // 1. Capture and inline all computed styles
                    const sourceElements = Array.from(element.getElementsByTagName('*'));
                    const clonedElements = Array.from(clonedElement.getElementsByTagName('*'));

                    // Include the roots themselves
                    sourceElements.unshift(element);
                    clonedElements.unshift(clonedElement);

                    console.log(`[PDF Export] Inlining styles for ${sourceElements.length} elements...`);

                    for (let i = 0; i < sourceElements.length; i++) {
                        const source = sourceElements[i] as HTMLElement;
                        const target = clonedElements[i] as HTMLElement;

                        if (source && target) {
                            const computedStyle = window.getComputedStyle(source);

                            // Properties that impact look and feel
                            const propsToCopy = [
                                'color', 'background-color', 'border-color', 'font-family',
                                'font-size', 'font-weight', 'line-height', 'padding',
                                'margin', 'display', 'flex-direction', 'align-items',
                                'justify-content', 'gap', 'width', 'height', 'opacity',
                                'text-align', 'border-radius', 'box-shadow', 'border-width',
                                'border-style', 'position', 'top', 'right', 'bottom', 'left'
                            ];

                            propsToCopy.forEach(prop => {
                                try {
                                    let value = computedStyle.getPropertyValue(prop);

                                    // Replace lab/oklch functions with black/solid fallbacks to prevent renderer crash
                                    // while keeping text and borders visible.
                                    if (value.includes('oklch')) {
                                        if (value.includes('0.556 0.142 38')) value = '#f59e0b';
                                        else if (value.includes('0.208 0.042')) value = '#18181b';
                                        else value = '#27272a';
                                    }

                                    target.style.setProperty(prop, value, 'important');
                                } catch { }
                            });
                        }
                    }

                    // 2. Remove all external/global styles to prevent the parser from seeing lab() colors
                    const head = clonedDoc.getElementsByTagName('head')[0];
                    if (head) {
                        const styles = head.querySelectorAll('style, link[rel="stylesheet"]');
                        console.log(`[PDF Export] Stripping ${styles.length} stylesheets from clone...`);
                        styles.forEach(s => s.remove());
                    }
                }
            });
            console.log('[PDF Export] Canvas captured successfully.');

            console.log('[PDF Export] Converting canvas to image data...');
            const imgData = canvas.toDataURL('image/png', 1.0);

            console.log('[PDF Export] Initializing jsPDF...');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const imgWidth = pdfWidth - (margin * 2);
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = margin;

            console.log('[PDF Export] Generating pages...', { imgHeight, pdfHeight });
            // Page 1
            pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            // Subsequent pages
            let pageNum = 1;
            while (heightLeft > 0) {
                pageNum++;
                console.log(`[PDF Export] Adding page ${pageNum}...`);
                position = heightLeft - imgHeight - margin;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            console.log('[PDF Export] Saving PDF file...');
            pdf.save(`${APP_CONFIG.orgName}_Resource.pdf`);
            console.log('[PDF Export] Export completed successfully.');
        } catch (e: unknown) {
            console.error('[PDF Export] CRITICAL FAILURE:', e);
            const errorStr = e instanceof Error ? e.message : String(e);
            alert(`PDF Export failed: ${errorStr}\n\nTip: You can also use "Print" (Ctrl+P) and "Save as PDF" for a high-quality export.`);
        } finally {
            setIsExporting(null);
        }
    };

    const handleExportDOCX = async () => {
        if (isExporting) return;
        setIsExporting('docx');

        try {
            // Dynamic imports for performance
            const { marked } = await import('marked');
            const htmlDocx = (await import('html-docx-js-typescript')).default;
            const { saveAs } = await import('file-saver');

            const brandedContent = `# ${APP_CONFIG.orgName}\n\n${content}`;
            const html = await marked(brandedContent) as string;
            const docx = await htmlDocx.asBlob(html) as Blob;
            saveAs(docx, 'lesson.docx');
        } catch (e: unknown) {
            console.error('Error generating DOCX:', e);
        } finally {
            setIsExporting(null);
        }
    };

    interface MarkdownComponentProps {
        children?: React.ReactNode;
        [key: string]: unknown; // react-markdown passes many props including node
    }

    const markdownComponents: Record<string, React.FC<MarkdownComponentProps>> = {
        h1: (props) => (
            <h1 className="mb-8 border-b-4 border-amber-100/50 pb-4 text-4xl font-black tracking-tight text-zinc-900" {...props} />
        ),
        h2: (props) => (
            <div className="mb-6 mt-12 flex items-center gap-4">
                <div className="h-8 w-1.5 rounded-full bg-amber-500" />
                <h2 className="text-2xl font-black text-zinc-900 tracking-tight m-0" {...props} />
            </div>
        ),
        h3: (props) => (
            <h3 className="mb-4 mt-8 text-xl font-black text-amber-800 tracking-tight" {...props} />
        ),
        p: (props) => (
            <p className="mb-6 text-lg leading-relaxed text-zinc-700 font-medium antialiased text-justify" {...props} />
        ),
        ul: (props) => (
            <ul className="mb-6 space-y-4 pl-0 list-none" {...props} />
        ),
        ol: (props) => (
            <ol className="mb-6 space-y-4 pl-6 list-decimal marker:text-amber-500 marker:font-black marker:text-lg" {...props} />
        ),
        li: ({ children, ...props }) => {
            const isOrderedItem = children && Array.isArray(children) && typeof children[0] === 'string' && /^\d+\./.test(children[0]);
            if (isOrderedItem) return <li {...props}>{children}</li>;
            
            return (
                <li className="flex items-start gap-4 text-lg text-zinc-700 font-medium" {...props}>
                    <div className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-amber-400 ring-4 ring-amber-50" />
                    <span>{children}</span>
                </li>
            );
        },
        strong: (props) => (
            <strong className="font-black text-zinc-900 bg-amber-50/50 px-1 rounded" {...props} />
        ),
        blockquote: (props) => (
            <blockquote className="border-l-8 border-amber-100 bg-amber-50/30 p-6 rounded-r-3xl my-8 italic text-zinc-700 font-semibold" {...props} />
        )
    };

    if (!content) return null;

    return (
        <div className="relative group overflow-hidden rounded-[2.5rem] border-2 border-zinc-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] shadow-zinc-200/50 transition-all duration-500 hover:border-amber-400/30">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-50 bg-zinc-50/50 px-6 py-5 md:px-8 gap-6 relative z-20">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg shadow-amber-500/20 ring-4 ring-white transition-transform group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </div>
                    <div>
                        <h3 className="text-base font-black text-zinc-900 tracking-tight">{t('common.generatedTitle')}</h3>
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">{t('common.readyToUse')}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={handleCopy}
                        className="flex-1 sm:flex-none group/btn inline-flex items-center justify-center gap-2.5 h-12 rounded-[14px] border border-zinc-200 bg-white px-5 text-xs font-black uppercase tracking-widest text-zinc-600 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 active:scale-[0.98]"
                    >
                        {copied ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M20 6 9 17l-5-5" /></svg>
                                <span className="text-emerald-600">{t('common.copied')}</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover/btn:text-amber-500 transition-colors"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                <span>{t('common.copyText')}</span>
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-2 flex-1 sm:flex-none">
                        <button
                            onClick={handleExportPDF}
                            disabled={!!isExporting}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 h-12 rounded-[14px] border border-zinc-200 bg-white px-5 text-xs font-black uppercase tracking-widest text-zinc-600 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-50 active:scale-[0.98]"
                        >
                            {isExporting === 'pdf' ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M10 12H4" /><path d="M10 16H4" /><path d="M10 20H4" /></svg>
                            )}
                            <span className="hidden md:inline">{t('common.pdf')}</span>
                            <span className="md:hidden">PDF</span>
                        </button>

                        <button
                            onClick={handleExportDOCX}
                            disabled={!!isExporting}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 h-12 rounded-[14px] border border-zinc-200 bg-white px-5 text-xs font-black uppercase tracking-widest text-zinc-600 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-50 active:scale-[0.98]"
                        >
                            {isExporting === 'docx' ? (
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                            )}
                            <span className="hidden md:inline">{t('common.docx')}</span>
                            <span className="md:hidden">Word</span>
                        </button>
                    </div>

                    {onRefine && (
                        <button
                            onClick={() => setShowRefine(!showRefine)}
                            className={cn(
                                "flex-1 sm:flex-none inline-flex items-center justify-center gap-2.5 h-12 rounded-[14px] px-5 text-xs font-black uppercase tracking-widest transition-all active:scale-[0.98]",
                                showRefine 
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20" 
                                    : "border border-zinc-200 bg-white text-zinc-600 hover:border-amber-400 hover:bg-amber-50"
                            )}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
                            <span>{t('common.refine')}</span>
                        </button>
                    )}
                </div>
            </div>

            <motion.div 
                animate={{ height: showRefine ? 'auto' : 0, opacity: showRefine ? 1 : 0 }}
                className="overflow-hidden bg-zinc-50/10"
            >
                <div className="p-6 md:p-8 flex flex-wrap gap-2.5">
                    {[
                        { key: 'simplify', type: 'making it simpler' },
                        { key: 'addDetails', type: 'adding more details' },
                        { key: 'shorten', type: 'making it shorter' },
                        { key: 'addActivities', type: 'adding more activities' }
                    ].map((opt) => (
                        <button
                            key={opt.key}
                            onClick={() => { onRefine?.(opt.type); setShowRefine(false); }}
                            className="inline-flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-[10px] font-black uppercase tracking-widest text-zinc-600 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 active:scale-[0.95]"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                            {t(`common.refine${opt.key.charAt(0).toUpperCase() + opt.key.slice(1)}`)}
                        </button>
                    ))}
                </div>
            </motion.div>

            <div id="output-document" className="relative bg-white px-6 py-10 md:px-16 md:py-16">
                <div className={cn("absolute inset-y-0 w-1 bg-amber-500/10", isRtl ? "right-0" : "left-0")} />

                <div className="mb-12 flex items-center gap-8 border-b-2 border-zinc-100 pb-10">
                    <div className="relative h-20 w-32 shrink-0">
                        <Image
                            src={APP_CONFIG.logoPath}
                            alt={APP_CONFIG.orgName}
                            fill
                            className="object-contain drop-shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-black tracking-[0.05em] text-zinc-900 uppercase">
                            {APP_CONFIG.orgName}
                        </h2>
                        <p className="text-xs font-black text-amber-600 uppercase tracking-[0.3em] mt-1.5">
                            Teacher Toolkit Platform
                        </p>
                    </div>
                </div>

                <div className="prose prose-zinc prose-amber max-w-none">
                {structured ? (
                    <div className="space-y-12">
                        <h1 className="mb-12 border-b-4 border-amber-100 pb-6 text-5xl font-black tracking-tight text-zinc-900 leading-tight">
                            {structured.title}
                        </h1>

                        <div className="grid gap-10">
                            {structured.sections.map((section, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative overflow-hidden rounded-[2.5rem] border-2 border-zinc-50 bg-white p-8 md:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.04)] transition-all hover:border-amber-200 hover:shadow-[0_25px_60px_rgba(245,158,11,0.08)] print:break-inside-avoid"
                                >
                                    <div className="absolute top-0 left-0 w-2 h-full bg-amber-500/20 group-hover:bg-amber-500 transition-colors pointer-events-none" />
                                    
                                    <div className="mb-6 flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 font-black text-xs">
                                            0{idx + 1}
                                        </div>
                                        <h2 className="text-2xl font-black text-zinc-900 tracking-tight m-0">
                                            {section.heading}
                                        </h2>
                                    </div>

                                    <div className="text-zinc-700">
                                        <ReactMarkdown 
                                            components={markdownComponents}
                                        >
                                            {section.content}
                                        </ReactMarkdown>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {structured.imagePrompts && structured.imagePrompts.length > 0 && (
                            <div className="mt-16 space-y-8">
                                <h3 className="text-sm font-black text-zinc-400 uppercase tracking-[0.3em] text-center">
                                    Educational Visual Aids
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {structured.imagePrompts.map((prompt, i) => (
                                        <motion.div 
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="group relative aspect-video overflow-hidden rounded-[2rem] border-2 border-zinc-100 bg-zinc-50"
                                        >
                                            <div className="relative h-full w-full">
                                                <Image 
                                                    src={`https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Math.floor(Math.random() * 1000)}&nologo=true`}
                                                    alt="Educational Visual"
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    unoptimized
                                                />
                                            </div>
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                <p className="text-[10px] font-medium text-white/90 leading-relaxed italic">
                                                    {prompt}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {structured.metadata && (
                            <div className="mt-20 rounded-3xl bg-zinc-900 p-8 text-white">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2">Pedagogical Insight</p>
                                        <p className="text-zinc-400 text-sm italic">{structured.metadata.pedagogicalGoal}</p>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 border border-white/10">
                                        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">
                                            {structured.metadata.differentiationLevel} Level
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <ReactMarkdown components={markdownComponents}>
                        {content}
                    </ReactMarkdown>
                )}
                </div>

            </div>

            <div className="flex justify-center items-center gap-3 border-t border-dashed border-zinc-200 bg-zinc-50/80 py-6 relative z-20">
                <div className="h-1 w-1 rounded-full bg-zinc-300" />
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">{t('common.generatedBy')}</p>
                <div className="h-1 w-1 rounded-full bg-zinc-300" />
            </div>
        </div>
    );
}
