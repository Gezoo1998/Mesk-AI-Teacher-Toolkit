'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export function OutputDisplay({ content }: { content: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!content) return null;

    return (
        <div className="relative animate-fade-in-soft overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-zinc-200/50 ring-1 ring-black/5">
            {/* Action Bar */}
            <div className="flex items-center justify-between border-b border-zinc-100 bg-zinc-50/80 px-6 py-4 backdrop-blur-md">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 ring-1 ring-amber-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-zinc-900">Generated Lesson Plan</h3>
                        <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wide">Ready to use</p>
                    </div>
                </div>
                <button
                    onClick={handleCopy}
                    className="group inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-zinc-700 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-50 hover:text-amber-800 focus:outline-none focus:ring-4 focus:ring-amber-100 active:scale-[0.98]"
                >
                    {copied ? (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><path d="M20 6 9 17l-5-5" /></svg>
                            <span className="text-emerald-700">Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 decoration-clone group-hover:text-amber-600"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                            <span>Copy Text</span>
                        </>
                    )}
                </button>
            </div>

            {/* Document Content */}
            <div className="bg-white px-8 py-8 md:px-12 md:py-10">
                <ReactMarkdown
                    components={{
                        // H1 - Major Title
                        h1: ({ node, ...props }) => (
                            <h1 className="mb-6 border-b-2 border-amber-100 pb-2 text-3xl font-extrabold tracking-tight text-zinc-900" {...props} />
                        ),
                        // H2 - Section Header (The main sections like "Objectives", "Activities")
                        h2: ({ node, ...props }) => (
                            <div className="mb-4 mt-8 flex items-center gap-3">
                                <span className="h-6 w-1 rounded-full bg-amber-500" />
                                <h2 className="text-xl font-bold text-zinc-900" {...props} />
                            </div>
                        ),
                        // H3 - Subsections
                        h3: ({ node, ...props }) => (
                            <h3 className="mb-3 mt-6 text-lg font-bold text-amber-800" {...props} />
                        ),
                        // Paragraphs - High Contrast, Comfortable Reading
                        p: ({ node, ...props }) => (
                            <p className="mb-4 text-base leading-7 text-zinc-800" {...props} />
                        ),
                        // Lists - Custom bullets
                        ul: ({ node, ...props }) => (
                            <ul className="mb-4 space-y-2 pl-4" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol className="mb-4 space-y-2 pl-4 list-decimal marker:text-amber-600 marker:font-bold" {...props} />
                        ),
                        li: ({ node, children, ...props }) => (
                            <li className="flex items-start gap-2 text-base text-zinc-800" {...props}>
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                                <span>{children}</span>
                            </li>
                        ),
                        // Bold text
                        strong: ({ node, ...props }) => (
                            <strong className="font-bold text-zinc-900" {...props} />
                        ),
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            {/* Footer Watermark */}
            <div className="flex justify-center border-t border-dashed border-zinc-200 bg-zinc-50/50 py-4">
                <p className="text-xs font-medium text-zinc-400">Generated by Mesk AI Toolkit</p>
            </div>
        </div>
    );
}
