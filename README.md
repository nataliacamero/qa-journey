# 🧪 SauceDemo Automation Framework: My QA Journey

Welcome to my automation repository. This project documents my professional transition from **Frontend Developer** to **SDET (Software Development Engineer in Test)**. Here, I apply advanced development practices to the world of E2E testing.

## 🎯 Project Objectives

- Implement robust and scalable **End-to-End (E2E)** tests.

- Master industry-leading tools like **Playwright**.

- Apply advanced design patterns, specifically **Page Object Model (POM)**.

- Isolate test data from test logic using **Data-Driven Testing (DDT)**.

- Configure professional environments using **TypeScript** and **Path Aliases**.

- Ensure software quality across multi-browser environments (Chromium, Firefox, WebKit).

## 🛠️ Technical Stack

- **Language:** TypeScript

- **Framework:** Playwright

- **Design Pattern:** Page Object Model (POM)

- **Data Architecture:** Data-Driven Testing (DDT) via JSON

- **Version Control:** Git / GitHub

- **Methodology:** Structured Test Cases (Clean Code & DRY principles)

## 📚 Engineering Study Topics (Phase 5 & 6: Cart & Architecture)

To master the current phases as an SDET, I am focusing on these core engineering concepts:

1. **Application State:** Understanding how the UI reflects the system's "memory" (React State) through dynamic elements like the _Cart Badge_.

2. **Data Persistence:** Validating that information (selected products) survives navigation between different URLs (`/inventory.html` -> `/cart.html` -> `/checkout-step-one.html`).

3. **Data-Driven Testing:** Separating _Input Data_ (users, product names) from _UI Constants_ (page titles, routing URLs) to ensure high maintainability.

4. **Test Lifecycle Hooks:** Utilizing nested `test.beforeEach()` to avoid code duplication and implement the DRY (Don't Repeat Yourself) principle.

## 🚀 Roadmap Progress

### Phase 1: Fundamentals & Scripting (Completed ✅)

- [x] **SSH Configuration:** Secure connection between local environment and GitHub.

- [x] **TC-01 (Happy Path):** Successful Login at SauceDemo.

- [x] **TC-02 (Sad Path):** Login with incorrect password.

### Phase 2: Architecture & Robustness (Completed ✅)

- [x] **POM Architecture:** Implementation of `LoginPage.ts` and `ProductPage.ts`.

- [x] **TC-03 (Sad Path):** Input validation for empty fields.

- [x] **TC-04 (Inventory):** Product load validation (6 items).

- [x] **Pro Configuration:** Implementation of Path Aliases (`@pages`).

### Phase 3: Data Integrity (Completed ✅)

- [x] **TC-05:** Dynamic validation of prices and names.

- [x] **TC-06:** Validation of product names against a Master List.

### Phase 4: Catalog Logic & Sorting (Completed ✅)

- [x] **TC-07:** Sorting by price (Low -> High).

- [x] **TC-08:** Sorting by price (High -> Low).

- [x] **TC-09:** Sorting by name (A -> Z).

- [x] **TC-10:** Sorting by name (Z -> A).

- [x] **Data Cleaning:** Implementation of type transformation for price integrity (String to Float).

> **Engineering Note:** We implemented a data flow validation based on mathematical relationships: $n \leq n+1$ (ascending) and $n \geq n+1$ (descending). This logic ensures dynamic sorting integrity and prevents "index out of bounds" errors by controlling array limits during iteration.

### Phase 5: Shopping Cart Flow (Completed ✅)

- [x] **TC-11:** Cart badge increment logic.

- [x] **TC-12:** Persistence validation in the cart page.

- [x] **TC-13:** Item removal and state update.

- [x] **TC-14:** Checkout cancellation and state retention.

- [x] **TC-15:** End-to-End purchase flow with checkout completion.

### Phase 6: SDET Architecture & Full Regression (Completed ✅)

- [x] **Data-Driven Testing (DDT):** Extraction of test data into `users.json`.

- [x] **Infrastructure Consolidation:** Centralization of dynamic URLs (Regex) and UI strings in `constants.ts` (Elimination of hardcoded strings).

- [x] **Advanced Hooks:** Implementation of global and nested `test.beforeEach()` hooks.

- [x] **Full Regression:** Successful execution of the complete suite (45/45 tests passing) across all configured browsers.

_Lead SDET: Natalia Camero Carreño_

---

## 🚀 Cómo ejecutar las pruebas

Para correr los tests en tu máquina local, sigue estos pasos:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Ejecutar todos los tests (Modo Headless):**
   ```bash
   npx playwright test
   ```
3. **Ejecutar un archivo de prueba específico:**
   ```bash
   npx playwright test tests/inventory.spec.ts
   ```
4. **Ejecutar los tests en modo visual (Headed):**

   ```bash
   npx playwright test --headed
   ```

5. **Ejecutar con la interfaz de usuario de Playwright (UI Mode):**
   ```bash
    npx playwright test --ui
   ```
6. **Abrir el último reporte generado:**
   ```bash
   npx playwright show-report
   ```

## 🚀 Cómo correr codegen

Para correr codegen en tu máquina local, ejecuta el siguiente comando:

```bash
   npx playwright codegen
```
