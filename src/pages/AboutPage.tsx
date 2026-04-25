import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        {/* Hero section */}
        <div className="relative h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">О Бронирование Столиков</h1>
              <p className="text-lg">Делаем бронирование столиков простым и удобным</p>
            </div>
          </div>
        </div>
        
        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Наша история</h2>
                <p className="text-gray-600 mb-4">
                  Бронирование Столиков начался с простой идеи: сделать обеды вне дома более приятными, устранив проблемы с получением столика в любимом ресторане.
                </p>
                <p className="text-gray-600 mb-4">
                  Основанная в 2026 году, наша платформа соединяет любителей еды с тщательно отобранными лучшими ресторанами по всей России. Мы увлечены тем, чтобы помочь посетителям открыть новые кулинарные впечатления, предоставляя ресторанам простую систему управления бронированием.
                </p>
                <p className="text-gray-600 mb-4">
                  То, что начиналось как небольшой проект, выросло в надежную платформу, которой пользуются тысячи посетителей и сотни ресторанов. Мы стремимся постоянно улучшать наши услуги для улучшения опыта питания для всех.
                </p>
                <Link to="/restaurants">
                  <Button className="bg-burgundy hover:bg-burgundy-600 text-white mt-4">
                    Исследовать рестораны
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Ужин в ресторане" 
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Соединять посетителей с исключительными ресторанами и создавать незабываемые впечатления от ужина через технологии простого бронирования.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-burgundy bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-burgundy">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Простота</h3>
                <p className="text-gray-600">
                  Мы верим в то, что процесс бронирования должен быть максимально простым и понятным как для посетителей, так и для ресторанов.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-burgundy bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-burgundy">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Качество</h3>
                <p className="text-gray-600">
                  Мы тщательно отбираем рестораны на нашей платформе, чтобы обеспечить нашим пользователям доступ к качественным кулинарным впечатлениям.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="h-12 w-12 bg-burgundy bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-burgundy">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Инновации</h3>
                <p className="text-gray-600">
                  Мы постоянно улучшаем нашу платформу новыми функциями и технологиями для улучшения пользовательского опыта.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
