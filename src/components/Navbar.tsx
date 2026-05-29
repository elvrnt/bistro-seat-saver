
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const closeMenu = () => setIsOpen(false);

  const authLinks = user ? (
    <>
      <span className="text-gray-700 flex items-center gap-2 text-sm">
        <User className="h-4 w-4" />
        {user.name}
      </span>
      <Button
        variant="outline"
        className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
        onClick={() => {
          logout();
          closeMenu();
        }}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Выйти
      </Button>
    </>
  ) : (
    <>
      <Link
        to="/login"
        className="text-gray-700 hover:text-burgundy transition-colors"
        onClick={closeMenu}
      >
        Вход
      </Link>
      <Link to="/register" onClick={closeMenu}>
        <Button variant="outline" className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white">
          Регистрация
        </Button>
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-burgundy font-bold text-2xl font-['Playfair_Display']">Бронирование Столиков</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-700 hover:text-burgundy transition-colors">Главная</Link>
          <Link to="/restaurants" className="text-gray-700 hover:text-burgundy transition-colors">Рестораны</Link>
          <Link to="/about" className="text-gray-700 hover:text-burgundy transition-colors">О нас</Link>
          {authLinks}
          <Link to="/restaurants">
            <Button className="bg-burgundy hover:bg-burgundy-600 text-white">Забронировать</Button>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 animate-fade-in border-t">
          <div className="flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-burgundy transition-colors py-2"
              onClick={closeMenu}
            >
              Главная
            </Link>
            <Link 
              to="/restaurants" 
              className="text-gray-700 hover:text-burgundy transition-colors py-2"
              onClick={closeMenu}
            >
              Рестораны
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-burgundy transition-colors py-2"
              onClick={closeMenu}
            >
              О нас
            </Link>
            {!user && (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-burgundy transition-colors py-2"
                  onClick={closeMenu}
                >
                  Вход
                </Link>
                <Link to="/register" onClick={closeMenu}>
                  <Button 
                    variant="outline"
                    className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white w-full"
                  >
                    Регистрация
                  </Button>
                </Link>
              </>
            )}
            {user && (
              <div className="py-2 text-gray-700 flex items-center gap-2">
                <User className="h-4 w-4" />
                {user.name}
              </div>
            )}
            <Link to="/restaurants" onClick={closeMenu}>
              <Button 
                className="bg-burgundy hover:bg-burgundy-600 text-white w-full"
              >
                Забронировать
              </Button>
            </Link>
            {user && (
              <Button
                variant="outline"
                className="border-burgundy text-burgundy w-full"
                onClick={() => {
                  logout();
                  closeMenu();
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Выйти
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
