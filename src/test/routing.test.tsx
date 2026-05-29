/**
 * SITE-R01 … SITE-R05: Application routing
 */

import { describe, expect, it } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import { renderWithProviders } from "./test-utils";
import Index from "@/pages/Index";
import RestaurantsPage from "@/pages/RestaurantsPage";
import RestaurantDetailsPage from "@/pages/RestaurantDetailsPage";
import AboutPage from "@/pages/AboutPage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import NotFound from "@/pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/restaurants" element={<RestaurantsPage />} />
      <Route path="/restaurant/:id" element={<RestaurantDetailsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

describe("Application routing", () => {
  it("SITE-R01: renders home page at /", () => {
    renderWithProviders(<AppRoutes />, { route: "/" });
    expect(
      screen.getByRole("heading", { name: /забронируйте ваш идеальный ужин/i })
    ).toBeInTheDocument();
  });

  it("SITE-R02: renders restaurants catalog at /restaurants", () => {
    renderWithProviders(<AppRoutes />, { route: "/restaurants" });
    expect(
      screen.getByRole("heading", { name: /найдите ваш идеальный ужин/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Прекрасная Эпоха")).toBeInTheDocument();
  });

  it("SITE-R03: renders restaurant details at /restaurant/:id", () => {
    renderWithProviders(<AppRoutes />, { route: "/restaurant/1" });
    expect(screen.getByRole("heading", { name: "Прекрасная Эпоха" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /забронировать столик/i })).toBeInTheDocument();
  });

  it("SITE-R04: renders about page at /about", () => {
    renderWithProviders(<AppRoutes />, { route: "/about" });
    expect(screen.getByRole("heading", { name: /о бронирование столиков/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /наша миссия/i })).toBeInTheDocument();
  });

  it("SITE-R05: renders 404 for unknown routes", () => {
    renderWithProviders(<AppRoutes />, { route: "/unknown-page" });
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
  });
});
