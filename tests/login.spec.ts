import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("TC-01: Login Exitoso (Happy Path)", async ({ page }) => {
  //Instanciamos la clase LoginPage
  const loginPage = new LoginPage(page);

  // 1. Ir a la página de Login
  await loginPage.navigateTo();

  // 2. Escribir usuario y contraseña, y clicar el boton de login. (usaremos una web de pruebas real)
  await loginPage.login("standard_user", "secret_sauce");

  // 3. Validar que entramos (Aserción)
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});

test("TC-02: Login Fallido (Sad Path)", async ({ page }) => {
  //Instanciamos la clase LoginPage
  const loginPage = new LoginPage(page);

  // 1. Ir a la página de Login
  await loginPage.navigateTo();

  // 2. Escribir usuario correcto y constraseña incorrecta y clicar el boton de login.
  await loginPage.login("standard_user", "no_es_esta");

  // 3. Validar que no entramos y vemos el mensaje de error (Aserción)
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
