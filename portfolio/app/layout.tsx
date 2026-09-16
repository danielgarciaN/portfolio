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
    default: 'Daniel García Nilo - Data Analyst & Computer Engineer',
    template: '%s | Daniel García Nilo',
  },
  description:
    'Portfolio profesional de Daniel García Nilo, Data Analyst e ingeniero informático con experiencia en Data Analytics, Power BI, SQL, Python, Snowflake, Data Science, IA y Software Engineering.',
  keywords: [
    'Daniel García Nilo',
    'Data Analyst',
    'Data Analytics',
    'Business Intelligence',
    'Power BI',
    'SQL',
    'Python',
    'Snowflake',
    'Ingeniero Informático',
    'Data Science',
    'Inteligencia Artificial',
    'AI Engineering',
    'Machine Learning',
    'Data Visualization',
    'Backend',
    'C#',
    '.NET',
    'Portfolio',
  ],
  authors: [{ name: 'Daniel García Nilo' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    title: 'Daniel García Nilo - Data Analyst & Computer Engineer',
    description:
      'Portfolio profesional de Daniel García Nilo. Data Analytics, Business Intelligence, Power BI, SQL, Python, Data Science, IA y Software Engineering.',
    siteName: 'Daniel García Nilo Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel García Nilo - Data Analyst & Computer Engineer',
    description:
      'Data Analyst e ingeniero informático con background en Data Science, IA y Software Engineering.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
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
