'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function PremiumBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base Background - Warm White with Ice Tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F0F6FA]/30 to-white transition-colors duration-700" />
            
            {/* Primary Blob - Navy/Royal Blue */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    x: [0, 40, 0],
                    y: [0, 25, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute -top-[12%] -left-[12%] h-[45%] w-[45%] rounded-full bg-gradient-to-br from-[#2B508F]/12 to-[#4378A0]/10 blur-[120px]"
            />
            
            {/* Secondary Blob - Ocean Blue */}
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    x: [0, -35, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 28,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3
                }}
                className="absolute top-[15%] -right-[12%] h-[55%] w-[55%] rounded-full bg-gradient-to-br from-[#4378A0]/10 to-[#72A2B8]/8 blur-[140px]"
            />

            {/* Tertiary Blob - Cyan accent */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, 25, 0],
                    y: [0, -40, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 6
                }}
                className="absolute -bottom-[18%] left-[15%] h-[55%] w-[55%] rounded-full bg-gradient-to-br from-[#72A2B8]/8 to-[#F0F6FA]/15 blur-[110px]"
            />

            {/* Small accent blob - top right */}
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, 10, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                }}
                className="absolute top-[8%] right-[20%] h-[20%] w-[20%] rounded-full bg-[#1E255E]/4 blur-[80px]"
            />

            {/* Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            
            {/* Subtle Grid - refined */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2B508F06_1px,transparent_1px),linear-gradient(to_bottom,#2B508F06_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_60%,transparent_100%)]" />

            {/* Bottom edge gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
        </div>
    );
}
