/**
 * SITE-C01 … SITE-C07: UI components and booking form
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import RestaurantCard from "@/components/RestaurantCard";
import Navbar from "@/components/Navbar";
import BookingForm from "@/components/BookingForm";
import RestaurantDetails from "@/components/RestaurantDetails";
import Footer from "@/components/Footer";
import { saveUser, hashPassword, setSessionUserId } from "@/lib/auth-storage";

const mockToast = vi.fn();

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mockToast, dismiss: vi.fn(), toasts: [] }),
}));

const sampleMenu = [
  {
    category: "Закуски",
    items: [{ name: "Суп", description: "Луковый", price: 500 }],
  },
];

const sampleRestaurant = {
  id: 1,
  name: "Тестовый Ресторан",
  images: ["https://example.com/photo.jpg"],
  description: "Описание тестового ресторана",
  cuisine: "Тестовая",
  rating: 4.5,
  reviewCount: 10,
  priceRange: "₽₽",
  address: "ул. Тестовая, 1",
  phone: "+7 900 000-00-00",
  website: "https://example.com",
  hours: { Понедельник: "10:00 - 22:00" },
  menu: sampleMenu,
};

describe("Site components", () => {
  beforeEach(() => {
    mockToast.mockClear();
    localStorage.clear();
  });

  it("SITE-C01: restaurant card links to details page", () => {
    renderWithProviders(
      <RestaurantCard
        id={5}
        name="Сад Специй"
        image="https://example.com/img.jpg"
        cuisine="Индийская"
        rating={4.4}
        priceRange="₽₽"
        location="Восточная часть"
      />
    );

    const link = screen.getByRole("link", { name: /сад специй/i });
    expect(link).toHaveAttribute("href", "/restaurant/5");
    expect(screen.getByText("4.4")).toBeInTheDocument();
    expect(screen.getByText("Индийская")).toBeInTheDocument();
  });

  it("SITE-C02: navbar shows login and register for guests", () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByRole("link", { name: /^вход$/i })).toHaveAttribute("href", "/login");
    expect(screen.getByRole("link", { name: /регистрация/i })).toHaveAttribute("href", "/register");
    expect(screen.queryByRole("button", { name: /выйти/i })).not.toBeInTheDocument();
  });

  it("SITE-C03: navbar shows user name and logout when authenticated", async () => {
    const passwordHash = await hashPassword("password123");
    saveUser({
      id: "nav-user-id",
      name: "Анна Тест",
      email: "anna@test.com",
      passwordHash,
    });
    setSessionUserId("nav-user-id");

    renderWithProviders(<Navbar />);

    await waitFor(() => {
      expect(screen.getByText("Анна Тест")).toBeInTheDocument();
    });
    expect(screen.getByRole("button", { name: /выйти/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /^вход$/i })).not.toBeInTheDocument();
  });

  it("SITE-C04: footer contains contact information", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByText(/info@bronirovaniestolikove\.ru/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /поиск ресторанов/i })).toHaveAttribute(
      "href",
      "/restaurants"
    );
  });

  it("SITE-C05: restaurant details shows menu and booking block", () => {
    renderWithProviders(<RestaurantDetails {...sampleRestaurant} />);
    expect(screen.getByRole("heading", { name: "Тестовый Ресторан" })).toBeInTheDocument();
    expect(screen.getByText(/описание тестового ресторана/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /меню/i })).toBeInTheDocument();
    expect(screen.getByText("Суп")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /забронировать столик/i })).toBeInTheDocument();
  });

  it("SITE-C06: booking form shows validation toast when date or time is missing", async () => {
    const user = userEvent.setup();
    renderWithProviders(<BookingForm restaurantId={1} restaurantName="Тест" />);

    await user.type(screen.getByLabelText(/полное имя/i), "Иван Тест");
    await user.type(screen.getByLabelText(/электронная почта/i), "ivan@test.com");
    await user.type(screen.getByLabelText(/номер телефона/i), "+7 900 000-00-00");
    await user.click(screen.getByRole("button", { name: /забронировать столик/i }));

    expect(mockToast).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Недостающая информация",
        variant: "destructive",
      })
    );
  });

  it("SITE-C07: booking form prefills contact fields for logged-in user", async () => {
    const passwordHash = await hashPassword("password123");
    saveUser({
      id: "booking-user-id",
      name: "Пётр Гость",
      email: "petr@test.com",
      phone: "+7 911 111-11-11",
      passwordHash,
    });
    setSessionUserId("booking-user-id");

    renderWithProviders(<BookingForm restaurantId={2} restaurantName="Кафе" />);

    await waitFor(() => {
      expect(screen.getByLabelText(/полное имя/i)).toHaveValue("Пётр Гость");
    });
    expect(screen.getByLabelText(/электронная почта/i)).toHaveValue("petr@test.com");
    expect(screen.getByLabelText(/номер телефона/i)).toHaveValue("+7 911 111-11-11");
  });
});
