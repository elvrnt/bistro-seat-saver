
import Hero from '../components/Hero';
import FeaturedRestaurants from '../components/FeaturedRestaurants';
import Features from '../components/Features';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedRestaurants />
      <Features />
      <Footer />
    </div>
  );
};

export default Index;
