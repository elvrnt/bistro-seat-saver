/**
 * SITE-P01 … SITE-P08: Main pages content and behaviour
 */

import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import Index from "@/pages/Index";
import RestaurantsPage from "@/pages/RestaurantsPage";
import AboutPage from "@/pages/AboutPage";
import RegisterPage from "@/pages/RegisterPage";
import LoginPage from "@/pages/LoginPage";

describe("Site pages", () => {
  it("SITE-P01: home page shows hero and featured restaurants", () => {
    renderWithProviders(<Index />);
    expect(
      screen.getByRole("heading", { name: /забронируйте ваш идеальный ужин/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /найти столик/i })).toHaveAttribute("href", "/restaurants");
    expect(screen.getByRole("heading", { name: /рекомендуемые рестораны/i })).toBeInTheDocument();
    expect(screen.getByText("Сакура Суши")).toBeInTheDocument();
  });

  it("SITE-P02: home page explains how the service works", () => {
    renderWithProviders(<Index />);
    expect(screen.getByRole("heading", { name: /как это работает/i })).toBeInTheDocument();
    expect(screen.getByText(/найдите ресторан/i)).toBeInTheDocument();
    expect(screen.getByText(/мгновенное подтверждение/i)).toBeInTheDocument();
  });

  it("SITE-P03: restaurants page lists all mock restaurants", () => {
    renderWithProviders(<RestaurantsPage />);
    const cards = [
      "Прекрасная Эпоха",
      "Сакура Суши",
      "Траттория Милано",
      "Дом Гриля",
      "Сад Специй",
      "Тапас и Вино",
      "Шанхайский Дворец",
      "Океан Блю",
      "Эль Ранчо",
      "Тадж Махал",
      "Маленькое Кафе",
      "Кухня Нонны",
    ];
    cards.forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("SITE-P04: restaurants search filters list by restaurant name", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RestaurantsPage />);

    const search = screen.getByPlaceholderText(/поиск по ресторанам/i);
    await user.type(search, "Сакура");

    expect(screen.getByText("Сакура Суши")).toBeInTheDocument();
    expect(screen.queryByText("Прекрасная Эпоха")).not.toBeInTheDocument();
  });

  it("SITE-P05: restaurants search shows empty state for unknown query", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RestaurantsPage />);

    const search = screen.getByPlaceholderText(/поиск по ресторанам/i);
    await user.type(search, "zzzz-not-found");

    expect(screen.getByRole("heading", { name: /рестораны не найдены/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /сбросить фильтры/i })).toBeInTheDocument();
  });

  it("SITE-P06: reset filters restores restaurant list", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RestaurantsPage />);

    const search = screen.getByPlaceholderText(/поиск по ресторанам/i);
    await user.type(search, "zzzz-not-found");
    await user.click(screen.getByRole("button", { name: /сбросить фильтры/i }));

    expect(screen.getByText("Прекрасная Эпоха")).toBeInTheDocument();
    expect(screen.getByText("Сакура Суши")).toBeInTheDocument();
  });

  it("SITE-P07: about page shows story and mission", () => {
    renderWithProviders(<AboutPage />);
    expect(screen.getByRole("heading", { name: /наша история/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /наша миссия/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /исследовать рестораны/i })).toHaveAttribute(
      "href",
      "/restaurants"
    );
  });

  it("SITE-P08: registration page renders form fields", () => {
    renderWithProviders(<RegisterPage />, { route: "/register" });
    expect(screen.getByRole("heading", { name: /регистрация/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/полное имя/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/подтверждение пароля/i)).toBeInTheDocument();
  });

  it("SITE-P09: login page renders form fields", () => {
    renderWithProviders(<LoginPage />, { route: "/login" });
    expect(screen.getByRole("heading", { name: /^вход$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^пароль$/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /зарегистрироваться/i })).toHaveAttribute(
      "href",
      "/register"
    );
  });
});
