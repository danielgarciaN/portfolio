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
    default: 'Daniel García Nilo - Ingeniero Informático, Software & Data Science',
    template: '%s | Daniel García Nilo',
  },
  description:
    'Portfolio profesional de Daniel García Nilo, ingeniero informático orientado a desarrollo software, Data Science, inteligencia artificial, backend y cloud.',
  keywords: [
    'Daniel García Nilo',
    'Ingeniero Informático',
    'Software Developer',
    'Data Science',
    'Inteligencia Artificial',
    'Machine Learning',
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
    title: 'Daniel García Nilo - Ingeniero Informático, Software & Data Science',
    description:
      'Portfolio profesional de Daniel García Nilo. Software, Data Science, IA, backend y cloud.',
    siteName: 'Daniel García Nilo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel García Nilo - Software & Data Science',
    description:
      'Ingeniero informático orientado a desarrollo software, Data Science, IA y cloud.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${manrope.variable} ${jetbrains.variable} font-sans antialiased`}>
        <I18nProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
