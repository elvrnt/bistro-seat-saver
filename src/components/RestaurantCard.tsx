
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

/**
 * Compact card representation used in restaurant lists.
 */
export interface RestaurantCardProps {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  location: string;
}

/**
 * Clickable card that links to a restaurant details page.
 */
const RestaurantCard = ({ 
  id, 
  name, 
  image, 
  cuisine, 
  rating, 
  priceRange, 
  location 
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-burgundy hover:bg-burgundy-600">
              <Star className="h-3.5 w-3.5 mr-1 fill-gold text-gold" />
              {rating.toFixed(1)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg line-clamp-1">{name}</h3>
            <span className="text-gray-500 text-sm">{priceRange}</span>
          </div>
          <div className="text-sm text-gray-600 mb-2">{cuisine}</div>
          <div className="text-sm text-gray-500">{location}</div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
