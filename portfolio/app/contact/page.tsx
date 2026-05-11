import type { Metadata } from 'next';
import ContactForm from '@/components/sections/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto',
  description:
    'Contacta con Daniel García Nilo para oportunidades, proyectos de software, Data Science, IA o cloud.',
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactForm />
    </div>
  );
}
