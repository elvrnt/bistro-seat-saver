
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RestaurantDetails from '../components/RestaurantDetails';

// Mock restaurant data
const restaurantData = {
  id: 1,
  name: "Прекрасная Эпоха",
  images: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ],
  description: "Прекрасная Эпоха - это изысканное французское заведение, предлагающее классические и современные блюда, приготовленные из лучших ингредиентов. Наша элегантная атмосфера передает очарование парижского бистро, обеспечивая при этом современный опыт.",
  cuisine: "Французская",
  rating: 4.8,
  reviewCount: 246,
  priceRange: "₽₽₽",
  address: "ул. Гурман, 123, Москва, Россия",
  phone: "+7 (123) 456-7890",
  website: "https://example.com",
  hours: {
    "Понедельник": "Закрыто",
    "Вторник": "17:00 - 22:00",
    "Среда": "17:00 - 22:00",
    "Четверг": "17:00 - 22:00",
    "Пятница": "17:00 - 23:00",
    "Суббота": "12:00 - 23:00",
    "Воскресенье": "12:00 - 21:00"
  },
  menu: [
    {
      category: "Закуски",
      items: [
        {
          name: "Французский луковый суп",
          description: "Карамелизированный лук в ароматном говяжьем бульоне с гренками и плавленым сыром Грюйер",
          price: 980
        },
        {
          name: "Эскарго",
          description: "Традиционные французские улитки, запеченные в чесночном масле с травами",
          price: 1200
        },
        {
          name: "Фуа-гра",
          description: "Обжаренная утиная печень с тостом бриош и инжирным джемом",
          price: 1650
        }
      ]
    },
    {
      category: "Основные блюда",
      items: [
        {
          name: "Кок-о-вен",
          description: "Тушеная курица в красном вине с грибами, беконом и жемчужным луком",
          price: 1850
        },
        {
          name: "Филе-миньон",
          description: "8 унций говяжьей вырезки с трюфельным маслом и соусом из красного вина",
          price: 2400
        },
        {
          name: "Буйабес",
          description: "Провансальское рагу из морепродуктов с шафрановым бульоном, подается с руйем и хрустящим хлебом",
          price: 2100
        }
      ]
    },
    {
      category: "Десерты",
      items: [
        {
          name: "Крем-брюле",
          description: "Классический ванильный крем с карамелизированной сахарной корочкой",
          price: 750
        },
        {
          name: "Шоколадное суфле",
          description: "Теплое шоколадное суфле с ванильным мороженым",
          price: 850
        },
        {
          name: "Тарт Татен",
          description: "Перевернутый карамелизированный яблочный тарт со сливками",
          price: 780
        }
      ]
    },
    {
      category: "Напитки",
      items: [
        {
          name: "Французские вина",
          description: "Спросите у официанта о нашей кураторской коллекции французских вин",
          price: 650
        },
        {
          name: "Шампанское",
          description: "Бокал премиального французского шампанского",
          price: 950
        },
        {
          name: "Французский мартини",
          description: "Водка, шамбор и ананасовый сок",
          price: 820
        }
      ]
    }
  ]
};

const RestaurantDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the restaurant data based on the ID
  // For this demo, we'll just use our mock data

  return (
    <div>
      <Navbar />
      <RestaurantDetails {...restaurantData} />
      <Footer />
    </div>
  );
};

export default RestaurantDetailsPage;
