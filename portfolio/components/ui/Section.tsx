'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className = '' }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`section-padding bg-[rgb(var(--color-page))] ${className}`}
    >
      <div className="section-container">{children}</div>
    </motion.section>
  );
}
