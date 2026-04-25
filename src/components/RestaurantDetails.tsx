
import { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Clock, MapPin, Phone, Globe, DollarSign } from "lucide-react";
import BookingForm from './BookingForm';

interface RestaurantDetailsProps {
  id: number;
  name: string;
  images: string[];
  description: string;
  cuisine: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  address: string;
  phone: string;
  website: string;
  hours: { [key: string]: string };
  menu: {
    category: string;
    items: {
      name: string;
      description: string;
      price: number;
    }[];
  }[];
}

const RestaurantDetails = ({
  id,
  name,
  images,
  description,
  cuisine,
  rating,
  reviewCount,
  priceRange,
  address,
  phone,
  website,
  hours,
  menu
}: RestaurantDetailsProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Images & Info */}
        <div className="lg:col-span-2">
          <div className="mb-8">
            <div className="relative h-80 md:h-96 overflow-hidden rounded-lg mb-4">
              <img 
                src={images[activeImageIndex]} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <div 
                  key={index} 
                  className={`cursor-pointer h-20 w-32 flex-shrink-0 rounded-md overflow-hidden border-2 ${activeImageIndex === index ? 'border-burgundy' : 'border-transparent'}`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={image} alt={`${name} ${index + 1}`} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="text-gray-700">
                {cuisine}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-gray-700">
                <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                {rating.toFixed(1)} ({reviewCount} отзывов)
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1 text-gray-700">
                <DollarSign className="h-3.5 w-3.5" />
                {priceRange}
              </Badge>
            </div>
            <p className="text-gray-700 mb-6">{description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-8">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-burgundy flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Адрес</div>
                  <div className="text-gray-600">{address}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-burgundy flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Телефон</div>
                  <div className="text-gray-600">{phone}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="h-5 w-5 text-burgundy flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold mb-1">Веб-сайт</div>
                  <a href={website} target="_blank" rel="noopener noreferrer" className="text-burgundy hover:underline">
                    Посетить сайт
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-burgundy" />
                Часы работы
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(hours).map(([day, time]) => (
                  <div key={day} className="flex justify-between py-1 border-b border-gray-100">
                    <span className="font-medium">{day}</span>
                    <span className="text-gray-600">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Menu Tabs */}
          <Tabs defaultValue={menu[0].category.toLowerCase()}>
            <h3 className="text-xl font-bold mb-4">Меню</h3>
            <TabsList className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-2">
              {menu.map((section) => (
                <TabsTrigger 
                  key={section.category} 
                  value={section.category.toLowerCase()}
                  className="data-[state=active]:bg-burgundy data-[state=active]:text-white"
                >
                  {section.category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {menu.map((section) => (
              <TabsContent 
                key={section.category} 
                value={section.category.toLowerCase()}
                className="animate-fade-in"
              >
                <div className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="flex justify-between gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="font-medium whitespace-nowrap">
                        {item.price.toFixed(2)} ₽
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Right column - Booking */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold mb-4">Забронировать столик</h2>
            <BookingForm restaurantId={id} restaurantName={name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
