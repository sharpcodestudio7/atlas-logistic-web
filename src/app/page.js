import dynamic from 'next/dynamic';
import { Nav, Hero, About, Services, WhyUs, ShowcaseSlider, Process, CTA, PaymentMarquee, ContactForm, Footer, WF } from '@/components/Atlas';

const AccessibilityWidget = dynamic(
  () => import('@/components/Atlas').then(mod => ({ default: mod.AccessibilityWidget })),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <ShowcaseSlider />
      <About />
      <WhyUs />
      <Process />
      <CTA />
      <ContactForm />
      <Footer />
      <WF />
      <AccessibilityWidget />
    </main>
  );
}
