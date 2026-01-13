import { test, expect } from "@playwright/test";

test("TC-01: Login Exitoso (Happy Path)", async ({ page }) => {
  // 1. Ir a la página de Login
  await page.goto("https://www.saucedemo.com/");

  // 2. Escribir usuario y contraseña (usaremos una web de pruebas real)
  await page.fill('[data-test="username"]', "standard_user");
  await page.fill('[data-test="password"]', "secret_sauce");

  // 3. Hacer clic en el botón de Login
  await page.click('[data-test="login-button"]');

  // 4. Validar que entramos (Aserción)
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});
