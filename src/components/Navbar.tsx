
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-burgundy font-bold text-2xl font-['Playfair_Display']">Бронирование Столиков</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-burgundy transition-colors">Главная</Link>
          <Link to="/restaurants" className="text-gray-700 hover:text-burgundy transition-colors">Рестораны</Link>
          <Link to="/about" className="text-gray-700 hover:text-burgundy transition-colors">О нас</Link>
          <Link to="/restaurants">
            <Button className="bg-burgundy hover:bg-burgundy-600 text-white">Забронировать</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 animate-fade-in">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-burgundy transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Главная
            </Link>
            <Link 
              to="/restaurants" 
              className="text-gray-700 hover:text-burgundy transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Рестораны
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-burgundy transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              О нас
            </Link>
            <Link to="/restaurants" onClick={() => setIsOpen(false)}>
              <Button 
                className="bg-burgundy hover:bg-burgundy-600 text-white w-full"
              >
                Забронировать
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
