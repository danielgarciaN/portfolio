'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useI18n, type Locale } from '@/lib/i18n';

const navLinks = [
  { href: '/#sobre-mi', key: 'about' },
  { href: '/#experiencia', key: 'experience' },
  { href: '/#formacion', key: 'education' },
  { href: '/#skills', key: 'skills' },
  { href: '/#proyectos', key: 'projects' },
  { href: '/#contacto', key: 'contact' },
] as const;

export default function Navbar() {
  const { locale, setLocale, messages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const languageSelector = (
    <div className="flex shrink-0 items-center gap-1" aria-label={messages.nav.language}>
      {(['es', 'en'] as Locale[]).map((language) => (
        <button key={language} onClick={() => setLocale(language)} aria-pressed={locale === language}
          aria-label={language === 'es' ? messages.nav.spanish : messages.nav.english}
          className={`rounded-md px-2 py-2 text-[11px] font-semibold uppercase tracking-wider transition-colors ${locale === language ? 'bg-accent/10 text-accent-ink' : 'text-subtle hover:text-ink'}`}>
          {language}
        </button>
      ))}
    </div>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${scrolled || isOpen ? 'border-line/10 bg-surface-950/95 backdrop-blur-xl' : 'border-transparent bg-surface-950/70'}`}>
      <nav className="section-container flex h-20 items-center justify-between gap-3">
        <Link href="/" className="text-[13px] font-semibold tracking-tight text-ink sm:text-base"> Daniel García Nilo - Data Analyst <span className="text-accent-ink">.</span></Link>
        <div className="hidden items-center gap-6 xl:flex">
          {navLinks.map((link) => <Link key={link.href} href={link.href} className="text-xs font-medium text-muted transition-colors hover:text-accent-ink">{messages.nav[link.key]}</Link>)}
          <span aria-hidden="true" className="h-4 w-px bg-white/15" />
          {languageSelector}
        </div>
        <div className="flex items-center gap-1 xl:hidden">
          {languageSelector}
          <button onClick={() => setIsOpen(!isOpen)} aria-label={messages.nav.menu} aria-expanded={isOpen} aria-controls="mobile-navigation" className="rounded-lg p-2 text-ink hover:text-accent-ink">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div id="mobile-navigation" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-line/10 bg-surface-950 xl:hidden">
            <div className="section-container flex flex-col gap-1 py-5">
              {navLinks.map((link) => <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="rounded-lg py-3 text-sm text-ink hover:text-accent-ink">{messages.nav[link.key]}</Link>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
