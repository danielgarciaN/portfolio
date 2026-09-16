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
  const [cutoutFailed, setCutoutFailed] = useState(false);
  const useCutout = Boolean(personalInfo.profileCutoutImage) && !cutoutFailed;

  return (
    <section className="hero-cover relative flex min-h-[min(900px,100dvh)] items-center overflow-hidden">
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

      <div className="section-container relative w-full pb-16 pt-28 lg:pb-24 lg:pt-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
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
              className="text-[clamp(3rem,5.9vw,6rem)] font-extrabold leading-[1.06] tracking-tight text-surface-950 dark:text-white"
            >
              <span className="block">Daniel</span><span className="block">García Nilo<span className="text-accent">.</span></span>
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
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative isolate h-[25rem] w-full max-w-[36rem] sm:h-[34rem] lg:h-[39rem]">
              <div aria-hidden="true" className="hero-orbit pointer-events-none" />
              <div aria-hidden="true" className="hero-orbit pointer-events-none !inset-[18%_-18%_10%_-5%] !rotate-[20deg] !bg-none" />
              <div aria-hidden="true" className="absolute -left-4 top-14 h-20 w-20 rounded-full bg-accent/15 blur-xl" />
              <div className={useCutout ? 'absolute inset-0' : 'absolute inset-x-4 bottom-7 top-8 overflow-hidden rounded-[4rem_1.5rem_4rem_1.5rem] border border-accent/25 shadow-[0_30px_80px_rgba(0,96,112,0.22)] sm:inset-x-8'}>
                {(!profileImageFailed || useCutout) && (
                  <Image
                    key={useCutout ? 'cutout' : 'portrait'}
                    src={useCutout ? personalInfo.profileCutoutImage : personalInfo.profileImage}
                    alt={messages.hero.imageAlt}
                    fill
                    priority
                    sizes="(min-width: 1440px) 576px, (min-width: 1024px) 45vw, (min-width: 640px) 576px, 90vw"
                    className={useCutout ? 'object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,96,112,0.22)]' : 'object-cover object-[50%_40%]'}
                    onError={() => useCutout ? setCutoutFailed(true) : setProfileImageFailed(true)}
                  />
                )}
                {profileImageFailed && !useCutout && (
                  <div className="flex h-full w-full items-center justify-center bg-[rgb(var(--color-card-muted))] text-7xl font-extrabold text-accent">DG</div>
                )}
                {!useCutout && <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-950/40 via-transparent to-transparent" />}
              </div>
              <div className="absolute bottom-0 left-0 right-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-accent/20 bg-[rgb(var(--color-card)/0.92)] px-5 py-4 shadow-xl shadow-accent/10 backdrop-blur-xl sm:left-4">
                <span className="font-mono text-xs font-semibold text-accent">SQL · Python · Power BI</span>
                <span className="text-xs text-surface-600 dark:text-slate-300">Data Analytics</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
