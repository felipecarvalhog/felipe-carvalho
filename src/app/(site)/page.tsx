import { BrandThread } from '@/components/brand/BrandThread';
import { About } from '@/components/sections/About';
import { Approaches } from '@/components/sections/Approaches';
import { Credentials } from '@/components/sections/Credentials';
import { FaqSection } from '@/components/sections/FaqSection';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { LgbtqCommitment } from '@/components/sections/LgbtqCommitment';
import { WaitlistSection } from '@/components/sections/WaitlistSection';
import { StructuredData } from '@/components/seo/StructuredData';
import styles from './page.module.css';

/**
 * Every section is a server component: the whole page is present in the HTML,
 * so it is crawlable and readable without waiting for JavaScript. Only the
 * mobile menu, the accordion and the form hydrate on the client.
 */
export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* The signature thread runs behind hero → approaches → CTA. */}
      <BrandThread />

      <Hero />
      <About />
      <Approaches />
      <Credentials />
      <LgbtqCommitment />
      <HowItWorks />
      <WaitlistSection />
      <FaqSection />

      <StructuredData />
    </div>
  );
}
