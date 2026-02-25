import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryShowcase from '@/components/CategoryShowcase';
import FeaturedProducts from '@/components/FeaturedProducts';
import Services from '@/components/Services';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-ink min-h-screen">
      <Preloader />
      <Navbar />
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <Services />
      <ContactForm />
      <Footer />
    </main>
  );
}

