import { Nav, Hero, About, Services, WhyUs, ShowcaseSlider, Process, CTA, PaymentMarquee, ContactForm, Footer, WF } from '@/components/Atlas';

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
    </main>
  );
}
