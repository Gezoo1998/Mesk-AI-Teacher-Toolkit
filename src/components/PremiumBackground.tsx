'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function PremiumBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base Background */}
            <div className="absolute inset-0 bg-slate-50 dark:bg-slate-950 transition-colors duration-700" />
            
            {/* Animated Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute -top-[10%] -left-[10%] h-[50%] w-[50%] rounded-full bg-gradient-to-br from-amber-200/40 to-orange-200/40 blur-[100px] dark:from-amber-900/20 dark:to-orange-900/20"
            />
            
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    x: [0, -40, 0],
                    y: [0, 60, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 2
                }}
                className="absolute top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-gradient-to-br from-blue-100/30 to-indigo-100/30 blur-[120px] dark:from-blue-900/10 dark:to-indigo-900/10"
            />

            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 30, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 5
                }}
                className="absolute -bottom-[20%] left-[20%] h-[70%] w-[70%] rounded-full bg-gradient-to-br from-emerald-100/30 to-teal-100/30 blur-[100px] dark:from-emerald-900/10 dark:to-teal-900/10"
            />

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            {/* Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
    );
}
