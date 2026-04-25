
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Забронируйте ваш идеальный ужин</h1>
          <p className="text-xl mb-8">Бронируйте столики в лучших ресторанах вашего города всего в несколько кликов.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/restaurants">
              <Button size="lg" className="bg-burgundy hover:bg-burgundy-600 text-white px-8 py-6 text-lg">
                Найти столик
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-burgundy px-8 py-6 text-lg bg-transparent">
                Узнать больше
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
