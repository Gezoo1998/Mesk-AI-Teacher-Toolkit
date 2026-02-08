'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/contexts/LanguageContext';

export function OutputDisplay({ content, onRefine }: { content: string; onRefine?: (type: string) => void }) {
    const [copied, setCopied] = useState(false);
    const [showRefine, setShowRefine] = useState(false);
    const [isExporting, setIsExporting] = useState<'pdf' | 'docx' | null>(null);
    const { t } = useLanguage();

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
                logging: true, // Enable html2canvas internal logging
                backgroundColor: '#ffffff',
                windowWidth: element.scrollWidth,
                windowHeight: element.scrollHeight
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
            pdf.save(`${t('common.schoolName')}_Resource.pdf`);
            console.log('[PDF Export] Export completed successfully.');
        } catch (e) {
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

            const brandedContent = `# ${t('common.schoolName')}\n\n${content}`;
            const html = await marked(brandedContent) as string;
            const docx = await htmlDocx.asBlob(html) as Blob;
            saveAs(docx, 'lesson.docx');
        } catch (e) {
            console.error('Error generating DOCX:', e);
        } finally {
            setIsExporting(null);
        }
    };

    if (!content) return null;

    return (
        <div className="relative animate-fade-in-soft overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-zinc-200/50 ring-1 ring-black/5">
            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-100 bg-zinc-50/80 px-4 py-4 md:px-6 gap-4 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-600 ring-1 ring-amber-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-sm font-bold text-zinc-900 truncate">{t('common.generatedTitle')}</h3>
                        <p className="text-[10px] md:text-[11px] font-medium text-zinc-500 uppercase tracking-wide truncate">{t('common.readyToUse')}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <button
                        onClick={handleCopy}
                        className="flex-1 sm:flex-none group inline-flex items-center justify-center gap-2 min-h-10 rounded-xl border border-zinc-200 bg-white px-3 md:px-4 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none ring-zinc-100 focus:ring-4 active:scale-[0.98]"
                    >
                        {copied ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M20 6 9 17l-5-5" /></svg>
                                <span className="text-emerald-700">{t('common.copied')}</span>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 group-hover:text-amber-600"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                                <span>{t('common.copyText')}</span>
                            </>
                        )}
                    </button>

                    <button
                        onClick={handleExportPDF}
                        disabled={!!isExporting}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 min-h-10 rounded-xl border border-zinc-200 bg-white px-3 md:px-4 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none ring-zinc-100 focus:ring-4 disabled:opacity-50 active:scale-[0.98]"
                    >
                        {isExporting === 'pdf' ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M10 12H4" /><path d="M10 16H4" /><path d="M10 20H4" /></svg>
                        )}
                        <span>{t('common.pdf')}</span>
                    </button>

                    <button
                        onClick={handleExportDOCX}
                        disabled={!!isExporting}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 min-h-10 rounded-xl border border-zinc-200 bg-white px-3 md:px-4 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none ring-zinc-100 focus:ring-4 disabled:opacity-50 active:scale-[0.98]"
                    >
                        {isExporting === 'docx' ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                        )}
                        <span>{t('common.docx')}</span>
                    </button>

                    {onRefine && (
                        <button
                            onClick={() => setShowRefine(!showRefine)}
                            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 min-h-10 rounded-xl border border-zinc-200 bg-white px-3 md:px-4 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none ring-zinc-100 focus:ring-4 active:scale-[0.98]"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M3 21v-5h5" /></svg>
                            <span>{t('common.refine')}</span>
                        </button>
                    )}
                </div>
            </div>

            {showRefine && onRefine && (
                <div className="flex gap-2 mt-4 animate-fade-in-soft">
                    <button
                        onClick={() => { onRefine('making it simpler'); setShowRefine(false); }}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-100 active:scale-[0.98]"
                    >
                        {t('common.refineSimplify')}
                    </button>
                    <button
                        onClick={() => { onRefine('adding more details'); setShowRefine(false); }}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-100 active:scale-[0.98]"
                    >
                        {t('common.refineAddDetails')}
                    </button>
                    <button
                        onClick={() => { onRefine('making it shorter'); setShowRefine(false); }}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-100 active:scale-[0.98]"
                    >
                        {t('common.refineShorten')}
                    </button>
                    <button
                        onClick={() => { onRefine('adding more activities'); setShowRefine(false); }}
                        className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-100 active:scale-[0.98]"
                    >
                        {t('common.refineAddActivities')}
                    </button>
                </div>
            )}

            {/* Document Content */}
            <div id="output-document" className="bg-white px-5 py-6 md:px-12 md:py-10">
                {/* School Header for Exports */}
                <div className="mb-10 flex items-center gap-6 border-b border-amber-100 pb-8">
                    <img
                        src="/mesk.png"
                        alt={t('common.logoAlt')}
                        className="h-16 w-auto object-contain"
                    />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-black tracking-tight text-amber-600 uppercase">
                            {t('common.schoolName')}
                        </h2>
                        <div className="mt-1 h-1 w-20 rounded-full bg-amber-400" />
                    </div>
                </div>

                <ReactMarkdown
                    components={{
                        // H1 - Major Title
                        h1: (props) => (
                            <h1 className="mb-6 border-b-2 border-amber-100 pb-2 text-3xl font-extrabold tracking-tight text-zinc-900" {...props} />
                        ),
                        // H2 - Section Header (The main sections like "Objectives", "Activities")
                        h2: (props) => (
                            <div className="mb-4 mt-8 flex items-center gap-3">
                                <span className="h-6 w-1 rounded-full bg-amber-500" />
                                <h2 className="text-xl font-bold text-zinc-900" {...props} />
                            </div>
                        ),
                        // H3 - Subsections
                        h3: (props) => (
                            <h3 className="mb-3 mt-6 text-lg font-bold text-amber-800" {...props} />
                        ),
                        // Paragraphs - High Contrast, Comfortable Reading
                        p: (props) => (
                            <p className="mb-4 text-base leading-7 text-zinc-800" {...props} />
                        ),
                        // Lists - Custom bullets
                        ul: (props) => (
                            <ul className="mb-4 space-y-2 pl-4" {...props} />
                        ),
                        ol: (props) => (
                            <ol className="mb-4 space-y-2 pl-4 list-decimal marker:text-amber-600 marker:font-bold" {...props} />
                        ),
                        li: ({ children, ...props }) => (
                            <li className="flex items-start gap-2 text-base text-zinc-800" {...props}>
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                <span>{children}</span>
                            </li>
                        ),
                        // Bold text
                        strong: (props) => (
                            <strong className="font-bold text-zinc-900" {...props} />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {/* Footer Watermark */}
            <div className="flex justify-center border-t border-dashed border-zinc-200 bg-zinc-50/50 py-4">
                <p className="text-xs font-medium text-zinc-400">{t('common.generatedBy')}</p>
            </div>
        </div>
    );
}
