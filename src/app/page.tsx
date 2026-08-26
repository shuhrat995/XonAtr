import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import Marquee from '@/components/home/Marquee';
import Features from '@/components/home/Features';
import Catalog from '@/components/home/Catalog';
import PriceExplainer from '@/components/home/PriceExplainer';
import SocialProof from '@/components/home/SocialProof';

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <Features />
        <Catalog />
        <PriceExplainer />
      </main>
      <Footer />
      <SocialProof />
    </>
  );
}
