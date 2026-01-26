'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '@/contexts/LanguageContext';
import { chatAction } from '@/app/actions';
import { ChatMessage } from '@/lib/ai/types';
import { cn } from '@/lib/utils';
import { Send, Trash2, Bot, User, Sparkles } from 'lucide-react';

export function ChatView() {
    const { t, language } = useLanguage();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isRTL = language === 'ar';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const result = await chatAction(newMessages);
            if (result.success && result.content) {
                setMessages([...newMessages, { role: 'assistant', content: result.content }]);
            } else {
                // Error handling - could add a toast here
                console.error(result.error);
            }
        } catch (error) {
            console.error("Chat Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        setMessages([]);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-40px)] max-w-6xl mx-auto bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/60 shadow-2xl overflow-hidden shadow-zinc-200/50">
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-4 border-b border-zinc-100 bg-white/60">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600 shadow-sm ring-1 ring-amber-500/10">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-base font-bold text-zinc-900 leading-tight">{t('chat.title')}</h2>
                        <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">{t('chat.subtitle')}</p>
                    </div>
                </div>
                <button
                    onClick={clearChat}
                    className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-all active:scale-95"
                    title={t('chat.clear')}
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 scrollbar-thin scrollbar-thumb-zinc-200">
                {messages.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center h-full text-center space-y-6"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-amber-400/20 blur-3xl rounded-full" />
                            <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 shadow-xl shadow-amber-500/20">
                                <Sparkles className="w-10 h-10" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-zinc-900 tracking-tight">{t('chat.welcome')}</h3>
                            <p className="text-sm text-zinc-500 max-w-sm mx-auto leading-relaxed">
                                {t('chat.placeholder')}
                            </p>
                        </div>
                    </motion.div>
                )}

                <AnimatePresence>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15, x: msg.role === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            className={cn(
                                "flex items-start gap-4",
                                msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <div className={cn(
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1",
                                msg.role === 'user'
                                    ? "bg-zinc-900 text-white ring-zinc-800"
                                    : "bg-amber-100 text-amber-600 ring-amber-500/20"
                            )}>
                                {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                            </div>
                            <div className={cn(
                                "relative max-w-[80%] rounded-[1.5rem] px-5 py-3.5 shadow-sm text-[15px] leading-relaxed",
                                msg.role === 'user'
                                    ? "bg-zinc-900 text-white rounded-tr-none"
                                    : "bg-white border border-zinc-100 text-zinc-800 rounded-tl-none",
                                isRTL ? "text-right" : "text-left"
                            )} dir={isRTL ? 'rtl' : 'ltr'}>
                                <div className="markdown-chat prose prose-sm max-w-none prose-zinc dark:prose-invert">
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-start gap-4"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600 ring-1 ring-amber-500/20 shadow-sm">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="bg-white border border-zinc-100 rounded-[1.5rem] rounded-tl-none px-5 py-3 shadow-sm">
                            <div className="flex gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="h-2 w-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-8 bg-white/80 border-t border-zinc-100">
                <div className="relative group max-w-5xl mx-auto">
                    <textarea
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
                            "w-full min-h-[80px] max-h-[300px] rounded-[2rem] border border-zinc-200 bg-zinc-50/50 px-8 py-6 pr-16 text-base font-bold text-zinc-900 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-8 focus:ring-amber-500/5 transition-all resize-none shadow-inner",
                            isRTL ? "text-right pr-8 pl-16" : "text-left"
                        )}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className={cn(
                            "absolute bottom-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-600 disabled:opacity-50 disabled:grayscale active:scale-90",
                            isRTL ? "left-3" : "right-3"
                        )}
                    >
                        <Send className={cn("w-5 h-5", isRTL && "rotate-180")} />
                    </button>
                </div>
                <p className="mt-2 text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Press Enter to send • Shift+Enter for new line
                </p>
            </div>
        </div>
    );
}
