
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RestaurantCard from "./RestaurantCard";
import { Link } from "react-router-dom";

// Mock data for featured restaurants
const featuredRestaurants = [
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
  }
];

const FeaturedRestaurants = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const showLoadMore = visibleCount < featuredRestaurants.length;

  const loadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + 3, featuredRestaurants.length));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Рекомендуемые рестораны</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Откройте для себя лучшие рестораны с высоким рейтингом, специально подобранные для вас
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRestaurants.slice(0, visibleCount).map(restaurant => (
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
        
        <div className="mt-12 text-center">
          {showLoadMore ? (
            <Button 
              variant="outline" 
              className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
              onClick={loadMore}
            >
              Показать еще
            </Button>
          ) : (
            <Link to="/restaurants">
              <Button className="bg-burgundy hover:bg-burgundy-600 text-white">
                Посмотреть все рестораны
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedRestaurants;
