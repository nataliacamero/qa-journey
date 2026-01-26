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
- [x] **TC-02 (Sad Path):** Login con contraseña incorrecta (Selectores resilientes).

### Fase 2: Arquitectura & Robustez

- [x] **Arquitectura POM:** Refactorización completa a Page Object Model (`pages/LoginPage.ts`).
- [x] **TC-03 (Sad Path):** Validación de inputs vacíos (Reutilización de código).
- [x] **Configuración Pro:** Implementación de Path Aliases (`@pages/`) en `tsconfig.json`.

### Fase 3: Escalabilidad (Próximamente)

- [ ] **Inventario:** Validación de listas y múltiples elementos.
- [ ] **Reportes:** Configuración de reportes visuales avanzados.

## 🚀 Cómo ejecutar las pruebas

Para correr los tests en tu máquina local, sigue estos pasos:

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
