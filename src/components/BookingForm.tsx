
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { ru } from 'date-fns/locale';
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  restaurantId?: number;
  restaurantName?: string;
}

const timeSlots = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"
];

const BookingForm = ({ restaurantId, restaurantName }: BookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState<string>("2");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email || !phone) {
      toast({
        title: "Недостающая информация",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log({
      restaurantId,
      restaurantName,
      date: format(date, "yyyy-MM-dd"),
      time,
      guests,
      name,
      email,
      phone,
      notes
    });
    
    toast({
      title: "Бронирование отправлено!",
      description: `Ваш столик на ${guests} ${parseInt(guests) === 1 ? 'человека' : 'человек'} на ${format(date, "d MMMM yyyy", { locale: ru })} в ${time} забронирован.`,
    });
    
    // Reset form
    setDate(undefined);
    setTime(undefined);
    setGuests("2");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Дата</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP", { locale: ru }) : <span>Выберите дату</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Время</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className="w-full">
                <SelectValue placeholder="Выберите время">
                  {time ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 opacity-70" />
                      <span>{time}</span>
                    </div>
                  ) : (
                    <span>Выберите время</span>
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="z-50 bg-white">
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="guests">Количество гостей</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger id="guests" className="w-full">
              <SelectValue placeholder="Количество гостей" />
            </SelectTrigger>
            <SelectContent className="z-50 bg-white">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "человек" : "человека"}
                </SelectItem>
              ))}
              <SelectItem value="9+">9+ человек</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="name">Полное имя</Label>
          <Input 
            id="name" 
            placeholder="Введите ваше имя" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Электронная почта</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="Введите вашу почту" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Номер телефона</Label>
          <Input 
            id="phone" 
            placeholder="Введите ваш номер телефона" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Особые пожелания (необязательно)</Label>
          <Input 
            id="notes" 
            placeholder="Любые особые пожелания или заметки" 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-burgundy hover:bg-burgundy-600 text-white">
        Забронировать столик
      </Button>
    </form>
  );
};

export default BookingForm;
