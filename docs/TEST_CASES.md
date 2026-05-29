# Test cases — Bistro Seat Saver

## Tools

| Tool | Purpose |
|------|---------|
| [Vitest](https://vitest.dev/) | Test runner (Vite-native) |
| [jsdom](https://github.com/jsdom/jsdom) | Browser-like environment |
| [@testing-library/react](https://testing-library.com/docs/react-testing-library/intro/) | Component and page rendering |
| [@testing-library/user-event](https://testing-library.com/docs/user-event/intro/) | User interactions (typing, clicks) |
| [@testing-library/jest-dom](https://github.com/testing-library/jest-dom) | DOM matchers |

Run all tests:

```sh
npm test
```

Подробные таблицы в формате «Название / Функция / Действие / Ожидаемый результат / Шаги»:  
см. [TEST_CASES_TABLES.md](./TEST_CASES_TABLES.md)

## Test files

| File | Scope |
|------|--------|
| `src/test/auth.test.tsx` | Authentication (TC-01 … TC-10) |
| `src/test/routing.test.tsx` | Routes (SITE-R01 … SITE-R05) |
| `src/test/site-pages.test.tsx` | Pages (SITE-P01 … SITE-P09) |
| `src/test/site-components.test.tsx` | Components (SITE-C01 … SITE-C07) |
| `src/test/test-utils.tsx` | Shared `renderWithProviders` helper |

---

## Authentication (10 tests)

| ID | Name | What is checked |
|----|------|-----------------|
| TC-01 | Deterministic password hash | Same password → same SHA-256 hash |
| TC-02 | Different password hashes | Different passwords → different hashes |
| TC-03 | Case-insensitive email lookup | `USER@EXAMPLE.COM` finds `user@example.com` |
| TC-04 | Save and find user | User in `localStorage` is found by email |
| TC-05 | Public user without password | `toPublicUser` hides `passwordHash` |
| TC-06 | Session lifecycle | Session id stored and cleared |
| TC-07 | Successful registration | Valid registration + session |
| TC-08 | Duplicate email | Second registration rejected |
| TC-09 | Short password | Password &lt; 6 chars rejected |
| TC-10 | Login valid/invalid | Wrong password fails; correct succeeds |

---

## Routing (5 tests)

| ID | Name | What is checked |
|----|------|-----------------|
| SITE-R01 | Home route `/` | Hero heading visible |
| SITE-R02 | Restaurants route | Catalog heading and restaurants |
| SITE-R03 | Restaurant details route | Name and booking block |
| SITE-R04 | About route | Story and mission sections |
| SITE-R05 | Unknown route | 404 page |

---

## Pages (9 tests)

| ID | Name | What is checked |
|----|------|-----------------|
| SITE-P01 | Home hero & featured | CTA link, featured restaurants |
| SITE-P02 | Home how it works | Three-step section |
| SITE-P03 | Full restaurant list | All 12 mock restaurants |
| SITE-P04 | Search by name | Filters to matching restaurant |
| SITE-P05 | Empty search state | “Рестораны не найдены” message |
| SITE-P06 | Reset filters | Restores full list |
| SITE-P07 | About page content | History, mission, explore link |
| SITE-P08 | Registration page | Form fields present |
| SITE-P09 | Login page | Form fields and register link |

---

## Components (7 tests)

| ID | Name | What is checked |
|----|------|-----------------|
| SITE-C01 | Restaurant card | Link to `/restaurant/:id`, rating, cuisine |
| SITE-C02 | Navbar (guest) | Login and register links |
| SITE-C03 | Navbar (authenticated) | User name and logout |
| SITE-C04 | Footer | Contact email and quick links |
| SITE-C05 | Restaurant details | Menu, description, booking |
| SITE-C06 | Booking validation | Toast when date/time missing |
| SITE-C07 | Booking autofill | Logged-in user contacts prefilled |

---

## Last run results

| ID | Test case | Status |
|----|-----------|--------|
| TC-01 | Deterministic password hash | Passed |
| TC-02 | Different password hashes | Passed |
| TC-03 | Case-insensitive email lookup | Passed |
| TC-04 | Save and find user | Passed |
| TC-05 | Public user without password hash | Passed |
| TC-06 | Session lifecycle | Passed |
| TC-07 | Successful registration | Passed |
| TC-08 | Duplicate email rejection | Passed |
| TC-09 | Short password rejection | Passed |
| TC-10 | Login valid / invalid credentials | Passed |
| SITE-R01 | Home route | Passed |
| SITE-R02 | Restaurants route | Passed |
| SITE-R03 | Restaurant details route | Passed |
| SITE-R04 | About route | Passed |
| SITE-R05 | 404 route | Passed |
| SITE-P01 | Home hero & featured | Passed |
| SITE-P02 | Home how it works | Passed |
| SITE-P03 | Full restaurant list | Passed |
| SITE-P04 | Search by name | Passed |
| SITE-P05 | Empty search state | Passed |
| SITE-P06 | Reset filters | Passed |
| SITE-P07 | About page content | Passed |
| SITE-P08 | Registration page | Passed |
| SITE-P09 | Login page | Passed |
| SITE-C01 | Restaurant card | Passed |
| SITE-C02 | Navbar (guest) | Passed |
| SITE-C03 | Navbar (authenticated) | Passed |
| SITE-C04 | Footer | Passed |
| SITE-C05 | Restaurant details | Passed |
| SITE-C06 | Booking validation | Passed |
| SITE-C07 | Booking autofill | Passed |

**Summary:** 31 passed, 0 failed
