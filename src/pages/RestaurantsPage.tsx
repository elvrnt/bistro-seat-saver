
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantCard from '../components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Filter } from 'lucide-react';

// Mock data for restaurants
const allRestaurants = [
  {
    id: 1,
    name: "Прекрасная Эпоха",
    image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Французская",
    rating: 4.8,
    priceRange: "₽₽₽",
    location: "Центр"
  },
  {
    id: 2,
    name: "Сакура Суши",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Японская",
    rating: 4.7,
    priceRange: "₽₽",
    location: "Набережная"
  },
  {
    id: 3,
    name: "Траттория Милано",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Итальянская",
    rating: 4.5,
    priceRange: "₽₽",
    location: "Западная часть"
  },
  {
    id: 4,
    name: "Дом Гриля",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Стейк-хаус",
    rating: 4.6,
    priceRange: "₽₽₽",
    location: "Деловой район"
  },
  {
    id: 5,
    name: "Сад Специй",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Индийская",
    rating: 4.4,
    priceRange: "₽₽",
    location: "Восточная часть"
  },
  {
    id: 6,
    name: "Тапас и Вино",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Испанская",
    rating: 4.3,
    priceRange: "₽₽",
    location: "Арт-район"
  },
  {
    id: 7,
    name: "Шанхайский Дворец",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Китайская",
    rating: 4.4,
    priceRange: "₽₽",
    location: "Чайна-таун"
  },
  {
    id: 8,
    name: "Океан Блю",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Морепродукты",
    rating: 4.6,
    priceRange: "₽₽₽",
    location: "Порт"
  },
  {
    id: 9,
    name: "Эль Ранчо",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Мексиканская",
    rating: 4.2,
    priceRange: "₽",
    location: "Южная часть"
  },
  {
    id: 10,
    name: "Тадж Махал",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Индийская",
    rating: 4.5,
    priceRange: "₽₽",
    location: "Северный край"
  },
  {
    id: 11,
    name: "Маленькое Кафе",
    image: "https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Французская",
    rating: 4.3,
    priceRange: "₽₽",
    location: "Старый город"
  },
  {
    id: 12,
    name: "Кухня Нонны",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    cuisine: "Итальянская",
    rating: 4.7,
    priceRange: "₽₽",
    location: "Маленькая Италия"
  }
];

const cuisineOptions = ["Все", "Французская", "Японская", "Итальянская", "Стейк-хаус", "Индийская", "Испанская", "Китайская", "Морепродукты", "Мексиканская"];
const priceOptions = ["Все", "₽", "₽₽", "₽₽₽"];
const ratingOptions = ["Все", "4.0+", "4.5+"];

const RestaurantsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisineFilter, setCuisineFilter] = useState("Все");
  const [priceFilter, setPriceFilter] = useState("Все");
  const [ratingFilter, setRatingFilter] = useState("Все");
  
  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    // Search term filter
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Cuisine filter
    const matchesCuisine = cuisineFilter === "Все" || restaurant.cuisine === cuisineFilter;
    
    // Price filter
    const matchesPrice = priceFilter === "Все" || restaurant.priceRange === priceFilter;
    
    // Rating filter
    let matchesRating = true;
    if (ratingFilter === "4.0+") {
      matchesRating = restaurant.rating >= 4.0;
    } else if (ratingFilter === "4.5+") {
      matchesRating = restaurant.rating >= 4.5;
    }
    
    return matchesSearch && matchesCuisine && matchesPrice && matchesRating;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero section */}
      <div className="bg-burgundy text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Найдите ваш идеальный ужин</h1>
          <p className="text-lg mb-0 max-w-2xl">
            Откройте для себя и забронируйте столики в лучших ресторанах города
          </p>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Поиск по ресторанам, кухне или местоположению..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full sm:w-40">
                <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Кухня" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineOptions.map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-40">
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Цена" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceOptions.map((price) => (
                      <SelectItem key={price} value={price}>
                        {price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="w-full sm:w-40">
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Рейтинг" />
                  </SelectTrigger>
                  <SelectContent>
                    {ratingOptions.map((rating) => (
                      <SelectItem key={rating} value={rating}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Restaurant listing */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        {filteredRestaurants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                image={restaurant.image}
                cuisine={restaurant.cuisine}
                rating={restaurant.rating}
                priceRange={restaurant.priceRange}
                location={restaurant.location}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-2">Рестораны не найдены</h3>
            <p className="text-gray-600 mb-6">Попробуйте изменить фильтры или поисковый запрос</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setCuisineFilter("Все");
                setPriceFilter("Все");
                setRatingFilter("Все");
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantsPage;
