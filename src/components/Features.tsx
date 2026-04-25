
import { Calendar, Clock, MapPin } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Как это работает</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Бронирование вашего следующего ужина никогда не было таким простым
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-burgundy bg-opacity-10 rounded-full flex items-center justify-center mb-6">
              <MapPin className="h-8 w-8 text-burgundy" />
            </div>
            <h3 className="text-xl font-bold mb-3">Найдите ресторан</h3>
            <p className="text-gray-600">
              Просматривайте нашу тщательно отобранную коллекцию лучших ресторанов в вашем районе
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-burgundy bg-opacity-10 rounded-full flex items-center justify-center mb-6">
              <Calendar className="h-8 w-8 text-burgundy" />
            </div>
            <h3 className="text-xl font-bold mb-3">Выберите дату и время</h3>
            <p className="text-gray-600">
              Выберите предпочитаемую дату и время для вашего ужина
            </p>
          </div>
          
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-burgundy bg-opacity-10 rounded-full flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-burgundy" />
            </div>
            <h3 className="text-xl font-bold mb-3">Мгновенное подтверждение</h3>
            <p className="text-gray-600">
              Получите немедленное подтверждение вашего бронирования
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
