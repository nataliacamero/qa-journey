# 🚀 QA Journey - Automatización con Playwright

Bienvenido a mi repositorio de aprendizaje y especialización en QA Automation. Este proyecto documenta mi transición de **Frontend Developer** a **SDET (Software Development Engineer in Test)**, aplicando buenas prácticas de desarrollo al mundo del testing.

## 🎯 Objetivos del Proyecto

- Implementar pruebas E2E (End-to-End) robustas y escalables.
- Dominar herramientas de última generación como **Playwright**.
- Aplicar patrones de diseño avanzados como **Page Object Model (POM)**.
- Configurar entornos profesionales con **TypeScript** y **Path Aliases**.
- Asegurar la calidad en entornos multi-navegador (Chromium, Firefox, WebKit).

## 🛠️ Stack Técnico

- **Lenguaje:** TypeScript
- **Framework:** Playwright
- **Patrón de Diseño:** Page Object Model (POM)
- **Gestión de Versiones:** Git / GitHub
- **Metodología:** Casos de prueba estructurados (Clean Code & DRY)

## 📈 Roadmap de Progreso

### Fase 1: Fundamentos & Scripting

- [x] **Configuración SSH:** Conexión segura del entorno local con GitHub.
- [x] **TC-01 (Happy Path):** Login Exitoso en SauceDemo.
- [x] **TC-02 (Sad Path):** Login con contraseña incorrecta.

### Fase 2: Arquitectura & Robustez

- [x] **Arquitectura POM:** Implementación de `LoginPage.ts` y `ProductPage.ts`.
- [x] **TC-03 (Sad Path):** Validación de inputs vacíos.
- [x] **TC-04 (Inventory):** Validación de carga de productos (6 items).
- [x] **Configuración Pro:** Uso de Path Aliases (@pages).

### Fase 3: Integridad de Datos (Siguiente)

- [x] **TC-05:** Validación dinámica de precios y nombres.
- [ ] **Filtros Avanzados:** Uso de `.filter()` para búsqueda de productos.

### Fase 4: Funcionalidades de Catálogo y Lógica de Filtros

- [x] **TC-07:** Ordenamiento por precio (Bajo -> Alto).
- [x] **TC-08:** Ordenamiento por precio (Alto -> Bajo).
- [x] **Data Cleaning:** Implementación de transformación de tipos para integridad de precios (String to Float).

> Nota de Ingeniería: Se implementó una validación de flujo de datos basada en la relación matemática $n \leq n+1$ (ascendente) y $n \geq n+1$ (descendente). Esta lógica asegura la integridad del ordenamiento dinámico, previniendo errores de desbordamiento de índice (index out of bounds) mediante el control de límites en la iteración del array de objetos.

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
