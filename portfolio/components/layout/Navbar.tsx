'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Moon, Sun, Terminal, X } from 'lucide-react';
import { useI18n, type Locale } from '@/lib/i18n';

const navLinks = [
  { href: '#sobre-mi', key: 'about' },
  { href: '#skills', key: 'skills' },
  { href: '#proyectos', key: 'projects' },
  { href: '#experiencia', key: 'experience' },
  { href: '#contacto', key: 'contact' },
];

const languages: { locale: Locale; flag: string; labelKey: 'spanish' | 'english' }[] = [
  { locale: 'es', flag: '🇪🇸', labelKey: 'spanish' },
  { locale: 'en', flag: '🇬🇧', labelKey: 'english' },
];

export default function Navbar() {
  const { locale, setLocale, messages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved === 'dark' || (!saved && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const languageSelector = (
    <div className="flex items-center gap-1 rounded-lg border border-surface-200 bg-white/70 p-1 shadow-sm backdrop-blur transition-colors dark:border-surface-800 dark:bg-surface-900/70">
      {languages.map((language) => (
        <button
          key={language.locale}
          onClick={() => setLocale(language.locale)}
          className={`flex h-8 w-8 items-center justify-center rounded-md text-base transition-all duration-200 ${
            locale === language.locale
              ? 'bg-accent text-white shadow-sm shadow-accent/20 dark:text-surface-950'
              : 'hover:bg-surface-100 dark:hover:bg-surface-800'
          }`}
          aria-label={messages.nav[language.labelKey]}
          title={messages.nav[language.labelKey]}
        >
          <span aria-hidden="true">{language.flag}</span>
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-surface-200/50 bg-white/80 shadow-sm backdrop-blur-xl dark:border-surface-800/50 dark:bg-surface-950/80'
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight">
          <Terminal className="h-4 w-4 text-accent" />
          <span className="text-surface-800 dark:text-surface-100">dgarcia-nilo</span>
          <span className="text-accent">_</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100"
            >
              {messages.nav[link.key as keyof typeof messages.nav]}
            </Link>
          ))}
          <div className="ml-2 h-5 w-px bg-surface-200 dark:bg-surface-700" />
          {languageSelector}
          <button
            onClick={toggleTheme}
            className="ml-1 rounded-lg p-2 text-surface-500 transition-colors hover:bg-surface-100 hover:text-accent dark:hover:bg-surface-800 dark:hover:text-accent"
            aria-label={messages.nav.theme}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {languageSelector}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-surface-500 transition-colors hover:bg-surface-100 hover:text-accent dark:hover:bg-surface-800 dark:hover:text-accent"
            aria-label={messages.nav.theme}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-surface-600 transition-colors hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800"
            aria-label={messages.nav.menu}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-surface-200/50 bg-white/95 backdrop-blur-xl dark:border-surface-800/50 dark:bg-surface-950/95 md:hidden"
          >
            <div className="section-container flex flex-col gap-1 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100"
                >
                  {messages.nav[link.key as keyof typeof messages.nav]}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
