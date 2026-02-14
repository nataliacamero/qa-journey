# 🧪 SauceDemo Automation Framework: My QA Journey

Welcome to my automation repository. This project documents my professional transition from **Frontend Developer** to **SDET (Software Development Engineer in Test)**. Here, I apply advanced development practices to the world of E2E testing.

## 🎯 Project Objectives

- Implement robust and scalable **End-to-End (E2E)** tests.
- Master industry-leading tools like **Playwright**.
- Apply advanced design patterns, specifically **Page Object Model (POM)**.
- Configure professional environments using **TypeScript** and **Path Aliases**.
- Ensure software quality across multi-browser environments (Chromium, Firefox, WebKit).

## 🛠️ Technical Stack

- **Language:** TypeScript
- **Framework:** Playwright
- **Design Pattern:** Page Object Model (POM)
- **Version Control:** Git / GitHub
- **Methodology:** Structured Test Cases (Clean Code & DRY principles)

## 📚 Engineering Study Topics (Phase 5: Shopping Cart)

To master the current phase as an SDET, I am focusing on these core engineering concepts:

1. **Application State:** Understanding how the UI reflects the system's "memory" (React State) through dynamic elements like the _Cart Badge_.
2. **Data Persistence:** Validating that information (selected products) survives navigation between different URLs (`/inventory.html` -> `/cart.html`).
3. **Side Effects:** Identifying DOM changes that occur after a user action (e.g., button text changing from "Add to cart" to "Remove").
4. **Baseline Testing:** Establishing an initial reference point (e.g., verifying the cart is empty at start) before executing mutation actions.

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

### Phase 5: Shopping Cart Flow (In Progress 🏗️)

- [x] **TC-11:** Cart badge increment logic.
- [ ] **TC-12:** Persistence validation in the cart page.
- [ ] **TC-13:** Item removal and state update.

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
