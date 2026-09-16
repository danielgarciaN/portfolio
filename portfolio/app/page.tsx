import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Timeline from '@/components/sections/Timeline';
import GithubSection from '@/components/sections/GithubSection';
import ContactForm from '@/components/sections/ContactForm';
import PassionateAbout from '@/components/sections/PassionateAbout';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <GithubSection />
      <ContactForm />
      <PassionateAbout />
    </>
  );
}
