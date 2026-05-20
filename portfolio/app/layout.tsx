import type { Metadata } from 'next';
import { JetBrains_Mono, Manrope } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { I18nProvider } from '@/lib/i18n';
import '@/styles/globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Daniel García Nilo - AI Engineer & Data Science',
    template: '%s | Daniel García Nilo',
  },
  description:
    'Portfolio profesional de Daniel García Nilo, ingeniero informático graduado orientado a AI Engineering, Data Science, automatización, backend y cloud.',
  keywords: [
    'Daniel García Nilo',
    'AI Engineer',
    'AI Engineering',
    'Ingeniero Informático',
    'Data Science',
    'Inteligencia Artificial',
    'Machine Learning',
    'RAG',
    'LangGraph',
    'Backend',
    'Cloud',
    'C#',
    '.NET',
    'Python',
    'Portfolio',
  ],
  authors: [{ name: 'Daniel García Nilo' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'Daniel García Nilo - AI Engineer & Data Science',
    description:
      'Portfolio profesional de Daniel García Nilo. AI Engineering, Data Science, IA aplicada, backend y cloud.',
    siteName: 'Daniel García Nilo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel García Nilo - AI Engineer & Data Science',
    description:
      'Ingeniero informático graduado orientado a AI Engineering, Data Science, IA aplicada y cloud.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable} font-sans antialiased`}>
        <I18nProvider>
          <Navbar />
          <main className="min-h-screen bg-[rgb(var(--color-page))]">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
