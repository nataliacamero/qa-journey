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

test("TC-02: Login Fallido (Sad Path)", async ({ page }) => {
  // 1. Ir a la página de Login
  await page.goto("https://www.saucedemo.com/");

  // 2. Escribir usuario correcto (Usando el atributo técnico data-test)
  await page.locator('[data-test="username"]').fill("standard_user");

  // 3. Escribir contraseña incorrecta
  await page.locator('[data-test="password"]').fill("no_es_esta");

  // 4. Hacer clic en el botón de Login
  await page.locator('[data-test="login-button"]').click();

  // 5. Validar que no entramos y vemos el mensaje de error (Aserción)
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
