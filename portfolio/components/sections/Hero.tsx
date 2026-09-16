'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { messages } = useI18n();
  const [profileImageFailed, setProfileImageFailed] = useState(false);

  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-[rgb(var(--color-page))]">
      <div
        className="pointer-events-none absolute inset-0 text-accent opacity-[0.055] dark:opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[linear-gradient(180deg,rgba(14,165,198,0.14),rgba(14,165,198,0))] dark:bg-[linear-gradient(180deg,rgba(34,211,238,0.12),rgba(34,211,238,0))]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-[linear-gradient(0deg,rgb(var(--color-page)),rgba(243,247,250,0))] dark:bg-[linear-gradient(0deg,rgb(var(--color-page)),rgba(7,11,18,0))]" />

      <div className="section-container relative w-full pt-28 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-[rgb(var(--color-card)/0.72)] px-4 py-2 text-xs font-bold text-accent shadow-sm shadow-accent/10 backdrop-blur dark:border-accent/30 dark:bg-white/5"
            >
              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
              {messages.hero.badge}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="text-5xl font-extrabold tracking-normal text-surface-950 dark:text-white sm:text-6xl lg:text-7xl"
            >
              {messages.hero.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="mt-5 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-accent sm:text-base"
            >
              {messages.hero.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-surface-600 dark:text-slate-200 sm:text-lg"
            >
              {messages.hero.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.36 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a href="#proyectos" className="btn-primary">
                {messages.hero.projectsCta}
                <ArrowDown className="h-3.5 w-3.5" />
              </a>
              <a href={personalInfo.cvUrl} className="btn-secondary" download>
                <Download className="h-3.5 w-3.5" />
                {messages.hero.cvCta}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.44 }}
              className="mt-7 flex items-center gap-2"
            >
              {[
                { href: personalInfo.github, label: 'GitHub', icon: Github },
                { href: personalInfo.linkedin, label: 'LinkedIn', icon: Linkedin },
                { href: `mailto:${personalInfo.email}`, label: 'Email', icon: Mail },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="rounded-xl border border-surface-200 bg-[rgb(var(--color-card)/0.66)] p-2.5 text-surface-500 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-md hover:shadow-accent/10 dark:border-white/15 dark:bg-white/5 dark:text-slate-300 dark:hover:text-accent"
                    aria-label={item.label}
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="order-first flex justify-center lg:order-last lg:justify-end"
          >
            <div className="relative h-[23rem] w-full max-w-[22rem] sm:h-[30rem] sm:max-w-[28rem] lg:h-[34rem] lg:max-w-[31rem]">
              <div className="absolute inset-x-6 bottom-6 top-16 rounded-[3rem] border border-accent/20 bg-[linear-gradient(145deg,rgba(255,255,255,0.82),rgba(221,245,248,0.44))] shadow-[0_30px_90px_rgba(0,124,145,0.18)] backdrop-blur dark:border-accent/20 dark:bg-[linear-gradient(145deg,rgba(34,211,238,0.14),rgba(13,21,32,0.72))] dark:shadow-[0_30px_90px_rgba(34,211,238,0.12)]" />
              <div className="absolute left-5 top-10 hidden h-24 w-24 rounded-3xl border border-accent/20 bg-[rgb(var(--color-card)/0.56)] p-4 shadow-lg shadow-accent/10 backdrop-blur sm:block dark:border-white/15 dark:bg-white/5">
                <div className="flex h-full items-end gap-1.5">
                  {[42, 66, 34, 78, 54].map((height, index) => (
                    <span
                      key={height + index}
                      className="w-full rounded-t bg-accent/80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute right-2 top-24 h-16 w-28 rounded-2xl border border-surface-200 bg-[rgb(var(--color-card)/0.68)] px-4 py-3 shadow-lg shadow-accent/10 backdrop-blur dark:border-white/15 dark:bg-white/5">
                <div className="h-2 w-16 rounded-full bg-accent/70" />
                <div className="mt-3 h-2 w-10 rounded-full bg-surface-300 dark:bg-white/30" />
              </div>
              <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden rounded-[3.5rem]">
                {!profileImageFailed && (
                  <Image
                    src={personalInfo.profileImage}
                    alt={messages.hero.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 496px, (min-width: 640px) 448px, 352px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-[1.025]"
                    onError={() => setProfileImageFailed(true)}
                  />
                )}
                {profileImageFailed && (
                  <div className="flex h-full w-full items-center justify-center bg-[rgb(var(--color-card-muted))] text-5xl font-extrabold text-accent dark:bg-surface-900">
                    DG
                  </div>
                )}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_54%,rgb(var(--color-page))_100%)] dark:bg-[linear-gradient(180deg,rgba(7,11,18,0)_54%,rgb(var(--color-page))_100%)]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
