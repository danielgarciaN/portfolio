'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Send } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { messages } = useI18n();
  const [profileImageFailed, setProfileImageFailed] = useState(false);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-accent/10 to-transparent dark:from-accent/5" />

      <div className="section-container w-full pt-28 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-accent shadow-sm backdrop-blur dark:border-accent/15 dark:bg-surface-900/60"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              {messages.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-4xl font-extrabold tracking-normal text-surface-950 dark:text-white sm:text-5xl lg:text-6xl"
            >
              {messages.hero.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 font-mono text-sm font-medium text-accent sm:text-base"
            >
              {messages.hero.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 max-w-2xl text-base leading-relaxed text-surface-600 dark:text-surface-400 sm:text-lg"
            >
              {messages.hero.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a href="#proyectos" className="btn-primary">
                {messages.hero.projectsCta}
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
              <a href={personalInfo.cvUrl} className="btn-secondary" download>
                <Download className="h-3.5 w-3.5" />
                {messages.hero.cvCta}
              </a>
              <a href="#contacto" className="btn-secondary">
                <Send className="h-3.5 w-3.5" />
                {messages.hero.contactCta}
              </a>
              <div className="hidden h-5 w-px bg-surface-200 dark:bg-surface-700 sm:block" />
              <div className="flex items-center gap-1">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2.5 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
                  aria-label="GitHub"
                >
                  <Github className="h-4.5 w-4.5" />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-2.5 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4.5 w-4.5" />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="rounded-lg p-2.5 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-300"
                  aria-label="Email"
                >
                  <Mail className="h-4.5 w-4.5" />
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="order-first flex justify-center lg:order-last lg:justify-end"
          >
            <div className="relative h-40 w-40 overflow-hidden rounded-[2rem] border border-white/70 bg-surface-100 shadow-xl shadow-surface-900/10 ring-1 ring-surface-200/70 dark:border-surface-800 dark:bg-surface-900 dark:shadow-black/20 dark:ring-surface-800 sm:h-52 sm:w-52 lg:h-64 lg:w-64">
              {!profileImageFailed && (
                <Image
                  src={personalInfo.profileImage}
                  alt={messages.hero.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 256px, (min-width: 640px) 208px, 160px"
                  className="object-cover"
                  onError={() => setProfileImageFailed(true)}
                />
              )}
              {profileImageFailed && (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface-100 to-surface-200 text-4xl font-extrabold text-accent dark:from-surface-900 dark:to-surface-800">
                  DG
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-surface-400"
        >
          <span className="text-[10px] uppercase tracking-[0.15em]">{messages.hero.scroll}</span>
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
