
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Алексей Иванов",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    role: "Food Enthusiast",
    quote: "TableReserve сделал процесс бронирования стола таким простым. Я люблю, что могу просматривать рестораны и меню, прежде чем принять решение.",
    rating: 5
  },
  {
    id: 2,
    name: "Мария Петрова",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    role: "Food Blogger",
    quote: "Как блогер, я регулярно пробую новые рестораны. TableReserve упростил мне жизнь, позволяя бронировать в любое время.",
    rating: 5
  },
  {
    id: 3,
    name: "Николай Смирнов",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    role: "Business Executive",
    quote: "Я часто организовываю деловые встречи, и TableReserve стал моим незаменимым помощником для быстрого бронирования ресторанов.",
    rating: 4
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from people who have enjoyed our service
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border border-gray-100 shadow-sm p-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 w-20 h-20 overflow-hidden rounded-full border-2 border-gold">
                <img 
                  src={currentTestimonial.image} 
                  alt={currentTestimonial.name}
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < currentTestimonial.rating ? 'fill-gold text-gold' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              
              <blockquote className="text-xl italic mb-6">"{currentTestimonial.quote}"</blockquote>
              
              <div>
                <div className="font-bold text-lg">{currentTestimonial.name}</div>
                <div className="text-gray-600">{currentTestimonial.role}</div>
              </div>
            </div>
          </Card>
          
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={prevTestimonial}
              className="rounded-full border border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            
            <Button 
              size="icon" 
              variant="outline" 
              onClick={nextTestimonial}
              className="rounded-full border border-burgundy text-burgundy hover:bg-burgundy hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
