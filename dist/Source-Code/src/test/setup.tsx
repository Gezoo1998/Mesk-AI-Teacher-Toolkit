import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => React.createElement('div', props, children),
    button: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => React.createElement('button', props, children),
    section: ({ children, ...props }: React.HTMLAttributes<HTMLElement>) => React.createElement('section', props, children),
    h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => React.createElement('h1', props, children),
    h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => React.createElement('h2', props, children),
    p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => React.createElement('p', props, children),
    span: ({ children, ...props }: React.HTMLAttributes<HTMLSpanElement>) => React.createElement('span', props, children),
  },
  AnimatePresence: ({ children }: { children?: React.ReactNode }) => children,
  useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
  useSpring: (v: unknown) => v,
  useTransform: (v: unknown) => v,
}));
