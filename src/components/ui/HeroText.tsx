'use client';

import { motion, Variants } from 'framer-motion';

export function HeroText({ text }: { text: string }) {
    // Detect if text contains Arabic
    const isArabic = /[\u0600-\u06FF]/.test(text);

    // For Arabic, we MUST split by words to keep letters connected.
    // For English, we can keep the "per-letter" magic animation.
    const items = isArabic ? text.split(' ') : Array.from(text);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.h1
            className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-500 sm:text-6xl drop-shadow-sm"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {items.map((item, index) => (
                <motion.span
                    variants={child}
                    key={index}
                    className="inline-block"
                >
                    {item === " " ? "\u00A0" : item}
                    {isArabic && index < items.length - 1 ? "\u00A0" : ""}
                </motion.span>
            ))}
        </motion.h1>
    );
}
