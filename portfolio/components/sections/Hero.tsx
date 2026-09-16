'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { useI18n } from '@/lib/i18n';

export default function Hero() {
  const { messages } = useI18n();
  const reduceMotion = useReducedMotion();
  const [cutoutFailed, setCutoutFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const useCutout = Boolean(personalInfo.profileCutoutImage) && !cutoutFailed;
  return (
    <section className="hero-cover relative isolate overflow-hidden">
      <div className="section-container grid min-h-[min(900px,100svh)] items-center gap-6 pb-12 pt-36 lg:grid-cols-[1fr_1.12fr] lg:gap-0 lg:pb-10 lg:pt-28">
        <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="relative z-10 pb-6 lg:py-16 lg:pr-8 xl:pr-0">
          <p className="heading-section mb-7">{messages.hero.badge}</p>
          <h1 className="text-[clamp(3.3rem,6.5vw,6.8rem)] font-semibold leading-[1.02] tracking-[-0.055em]">
            <span className="block">{messages.hero.name.split(' ')[0]}</span>
            <span className="block text-accent">{messages.hero.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="mt-7 text-base font-medium tracking-wide text-ink sm:text-xl">{messages.hero.title}</p>
          <p className="mt-5 max-w-[33rem] text-sm leading-7 text-muted sm:text-base">{messages.hero.bio}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#proyectos" className="btn-primary">{messages.hero.projectsCta}<ArrowUpRight className="h-4 w-4" /></a>
            <a href={personalInfo.cvUrl} className="btn-secondary" download><Download className="h-4 w-4" />{messages.hero.cvCta}</a>
          </div>
          <div className="mt-8 flex items-center gap-5">
            {[{ href: personalInfo.github, label: 'GitHub', icon: Github }, { href: personalInfo.linkedin, label: 'LinkedIn', icon: Linkedin }, { href: `mailto:${personalInfo.email}`, label: 'Email', icon: Mail }].map(({ href, label, icon: Icon }) => (
              <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} aria-label={label} className="p-1 text-subtle transition-all hover:-translate-y-1 hover:text-accent-ink"><Icon className="h-5 w-5" strokeWidth={1.5} /></a>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="hero-image relative aspect-square w-full lg:w-[120%] lg:-ml-[12%]">
          {(!imageFailed || useCutout) && <Image key={useCutout ? 'cutout' : 'photo'} src={useCutout ? personalInfo.profileCutoutImage : personalInfo.profileImage}
            alt={messages.hero.imageAlt} fill priority sizes="(min-width: 1520px) 890px, (min-width: 1024px) 64vw, 95vw"
            className={useCutout ? 'hero-portrait object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.3)]' : 'hero-portrait-fallback object-cover object-[50%_35%]'}
            onError={() => useCutout ? setCutoutFailed(true) : setImageFailed(true)} />}
        </motion.div>
      </div>
      <div aria-hidden="true" className="section-container"><div className="h-px bg-gradient-to-r from-accent/40 via-white/10 to-transparent" /></div>
    </section>
  );
}
