'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/contexts/LanguageContext';
import { chatAction } from '@/app/actions';
import { ChatMessage } from '@/lib/ai/types';
import { cn } from '@/lib/utils';
import { Send, Trash2, Bot, User, Sparkles, Copy, Check, ArrowRight, ArrowLeft } from 'lucide-react';

export function ChatView() {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const isRTL = language === 'ar';

    const starterSuggestions = isRTL ? [
        { label: 'فكرة تمهيدية للحصة (5 دقائق)', prompt: 'اقترح لي 3 أفكار تمهيدية مشوقة مدتها 5 دقائق لبدء درس جديد وتفاعل الطلاب.' },
        { label: 'سلم تقييم متمايز للمهارات', prompt: 'صمم سلم تقييم متمايز من 4 مستويات لتقييم مهارات العرض التقديمي للطلاب.' },
        { label: 'استراتيجية تفاعلية لتحفيز الصف', prompt: 'اقترح استراتيجية تعلم نشط تفاعلية مناسبة لصف متوسط لزيادة المشاركة والتفكير النقدي.' },
        { label: 'أسئلة تقويم تكويني سريعة', prompt: 'اكتب 4 أسئلة تقويم تكويني سريعة (بطاقات خروج) لقياس فهم الطلاب للمفاهيم الأساسية.' },
    ] : [
        { label: '5-minute lesson hook', prompt: 'Suggest 3 exciting 5-minute warm-up hooks to introduce a new topic and capture students attention.' },
        { label: 'Differentiated rubric', prompt: 'Create a 4-level differentiated grading rubric to assess student group presentations.' },
        { label: 'Interactive engagement strategy', prompt: 'Recommend an active learning strategy suitable for middle school to boost participation.' },
        { label: 'Quick formative exit ticket', prompt: 'Draft 4 quick formative assessment exit-ticket questions to verify student mastery.' },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    const handleSend = async (messageText?: string) => {
        const textToSend = (messageText ?? input).trim();
        if (!textToSend || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: textToSend };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatAction(newMessages);
            if (result.success && result.content) {
                setMessages([...newMessages, { role: 'assistant', content: result.content }]);
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error("Chat Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectSuggestion = (prompt: string) => {
        setInput(prompt);
        textareaRef.current?.focus();
    };

    const handleCopy = (content: string, idx: number) => {
        navigator.clipboard.writeText(content);
        setCopiedIndex(idx);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="flex flex-col h-[calc(100dvh-130px)] md:h-[calc(100vh-40px)] max-w-6xl mx-auto bg-white/95 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] border border-zinc-200/80 shadow-[0_20px_60px_rgba(30,37,94,0.08)] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 md:px-8 py-3.5 md:py-4 border-b border-zinc-100 bg-white/90 backdrop-blur-md">
                <div className="flex items-center gap-3.5">
                    <div className="relative flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2B508F] to-[#1E255E] text-white shadow-md shadow-[#1E255E]/20 ring-2 ring-white">
                        <Bot className="w-5 h-5 md:w-5 md:h-5" />
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
                        </span>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm md:text-base font-black text-zinc-900 leading-tight tracking-tight">{t('chat.title')}</h2>
                            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                {isRTL ? 'متصل وجاهز' : 'Active'}
                            </span>
                        </div>
                        <p className="text-[10px] md:text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">{t('chat.subtitle')}</p>
                    </div>
                </div>
                <button
                    onClick={clearChat}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all active:scale-95 text-xs font-semibold"
                    title={t('chat.clear')}
                >
                    <Trash2 className="w-4 h-4" />
                    <span className="hidden md:inline">{t('chat.clear')}</span>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 py-5 md:py-8 space-y-5 md:space-y-6 scrollbar-thin scrollbar-thumb-blue-200/60">
                {messages.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col items-center justify-center h-full text-center space-y-6 md:space-y-8 py-6"
                    >
                        <div className="relative">
                            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-blue-200/40 via-cyan-100/30 to-transparent blur-xl"></div>
                            <div className="relative flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#2B508F] to-[#1E255E] text-white shadow-xl shadow-[#1E255E]/25 ring-4 ring-white">
                                <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-cyan-200" />
                            </div>
                        </div>

                        <div className="space-y-2 max-w-md mx-auto">
                            <h3 className="text-xl md:text-2xl font-black text-[#1E255E] tracking-tight">{t('chat.welcome')}</h3>
                            <p className="text-xs md:text-sm text-zinc-600 leading-relaxed font-medium">
                                {isRTL
                                    ? 'مساعدك الذكي المخصص لمدارس المنهل العالمية جاهز لمساعدتك في صياغة الدروس، حلول المشكلات الصفية، وبناء الأنشطة التعليمية.'
                                    : 'Your dedicated teaching companion for Al Manhal International Schools is ready to brainstorm, build activities, and refine lesson plans.'
                                }
                            </p>
                        </div>

                        {/* Starter Suggestion Chips */}
                        <div className="w-full max-w-2xl pt-2">
                            <p className="text-[11px] font-black uppercase tracking-widest text-[#2B508F] mb-3">
                                {isRTL ? '✨ جرّب أن تسأل عن:' : '✨ Try starting with:'}
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {starterSuggestions.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelectSuggestion(item.prompt)}
                                        className="group flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-50/80 hover:bg-blue-50/70 border border-zinc-200/80 hover:border-blue-200 transition-all text-left shadow-sm hover:shadow active:scale-[0.98]"
                                        dir={isRTL ? 'rtl' : 'ltr'}
                                    >
                                        <span className="text-xs font-bold text-zinc-800 group-hover:text-[#1E255E] transition-colors leading-snug">
                                            {item.label}
                                        </span>
                                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white group-hover:bg-[#2B508F] text-zinc-400 group-hover:text-white transition-all shadow-xs border border-zinc-200/60 group-hover:border-transparent">
                                            {isRTL ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 14, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            className={cn(
                                "flex items-start gap-3 md:gap-4",
                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div className={cn(
                                "flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-2",
                                msg.role === 'user'
                                    ? "bg-gradient-to-br from-zinc-800 to-zinc-950 text-white ring-white"
                                    : "bg-gradient-to-br from-[#2B508F] to-[#1E255E] text-white ring-white shadow-md shadow-[#1E255E]/15"
                            )}>
                                {msg.role === 'user' ? <User className="w-4 h-4 md:w-5 md:h-5" /> : <Bot className="w-4 h-4 md:w-5 md:h-5 text-cyan-200" />}
                            </div>

                            <div className={cn(
                                "group relative max-w-[85%] md:max-w-[78%] px-4 md:px-5 py-3.5 md:py-4 shadow-sm text-sm md:text-[15px] leading-relaxed",
                                msg.role === 'user'
                                    ? cn(
                                        "bg-gradient-to-br from-[#1E255E] to-[#2B508F] text-white shadow-md shadow-blue-950/15 rounded-2xl md:rounded-[22px]",
                                        isRTL ? "rounded-tl-none" : "rounded-tr-none"
                                    )
                                    : cn(
                                        "bg-white/95 backdrop-blur-sm border border-zinc-200/90 text-zinc-900 shadow-[0_4px_20px_rgba(30,37,94,0.04)] rounded-2xl md:rounded-[22px]",
                                        isRTL ? "rounded-tr-none" : "rounded-tl-none"
                                    ),
                                isRTL ? "text-right" : "text-left"
                            )} dir={isRTL ? 'rtl' : 'ltr'}>
                                {msg.role === 'assistant' && (
                                    <div className="flex items-center justify-between gap-4 mb-2 pb-2 border-b border-zinc-100">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-[#2B508F]">
                                            {isRTL ? 'مساعد المنهل الذكي' : 'Al Manhal AI Assistant'}
                                        </span>
                                        <button
                                            onClick={() => handleCopy(msg.content, idx)}
                                            className="opacity-60 hover:opacity-100 p-1 rounded-md text-zinc-400 hover:text-[#2B508F] transition-all"
                                            title={isRTL ? 'نسخ الإجابة' : 'Copy answer'}
                                        >
                                            {copiedIndex === idx ? (
                                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                            ) : (
                                                <Copy className="w-3.5 h-3.5" />
                                            )}
                                        </button>
                                    </div>
                                )}

                                <div className={cn(
                                    "markdown-chat prose prose-sm max-w-none",
                                    msg.role === 'user'
                                        ? "prose-invert text-white prose-p:text-white prose-strong:text-white prose-headings:text-white"
                                        : "prose-zinc text-zinc-800 prose-headings:text-[#1E255E] prose-strong:text-zinc-900"
                                )}>
                                    <ReactMarkdown>
                                        {msg.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 md:gap-4"
                    >
                        <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2B508F] to-[#1E255E] text-white ring-2 ring-white shadow-md shadow-[#1E255E]/15">
                            <Bot className="w-4 h-4 md:w-5 md:h-5 text-cyan-200" />
                        </div>
                        <div className={cn(
                            "bg-white border border-zinc-200/90 rounded-2xl md:rounded-[22px] px-5 py-4 shadow-sm flex items-center gap-3",
                            isRTL ? "rounded-tr-none" : "rounded-tl-none"
                        )}>
                            <div className="flex gap-1.5 items-center">
                                <span className="h-2 w-2 rounded-full bg-[#2B508F] animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="h-2 w-2 rounded-full bg-[#4378A0] animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="h-2 w-2 rounded-full bg-[#72A2B8] animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs font-bold text-zinc-500">
                                {t('chat.thinking')}
                            </span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 bg-white/95 backdrop-blur-md border-t border-zinc-100">
                <div className="relative group max-w-5xl mx-auto">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                        placeholder={t('chat.placeholder')}
                        className={cn(
                            "w-full min-h-[64px] md:min-h-[82px] max-h-[220px] rounded-2xl md:rounded-[2rem] border border-zinc-200/80 bg-zinc-50/70 hover:bg-zinc-50 focus:bg-white px-5 md:px-7 py-4 md:py-5 pr-14 md:pr-18 text-sm md:text-base font-bold text-zinc-900 placeholder:text-zinc-400 focus:border-[#2B508F] focus:outline-none focus:ring-4 focus:ring-[#2B508F]/10 transition-all resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]",
                            isRTL ? "text-right pr-5 md:pr-7 pl-14 md:pl-18" : "text-left"
                        )}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <button
                        onClick={() => handleSend()}
                        disabled={!input.trim() || isLoading}
                        className={cn(
                            "absolute bottom-3 md:bottom-4 flex h-10 w-10 md:h-11 md:w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2B508F] to-[#1E255E] text-white shadow-lg shadow-[#1E255E]/25 transition-all hover:shadow-[#1E255E]/40 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none active:scale-95",
                            isRTL ? "left-3 md:left-4" : "right-3 md:right-4"
                        )}
                    >
                        <Send className={cn("w-4 h-4 md:w-5 md:h-5", isRTL && "rotate-180")} />
                    </button>
                </div>
                <p className="mt-2.5 text-center text-[9px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest hidden sm:block">
                    {isRTL ? 'اضغط Enter للإرسال • Shift + Enter لسطر جديد' : 'Press Enter to send • Shift + Enter for new line'}
                </p>
            </div>
        </div>
    );
}
