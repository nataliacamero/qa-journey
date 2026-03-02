import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import testData from "./data/users.json";

test("TC-01: Login Exitoso (Happy Path)", async ({ page }) => {
  //Instanciamos la clase LoginPage
  const loginPage = new LoginPage(page);

  // 1. Ir a la página de Login
  await loginPage.navigateTo();

  // 2. Escribir usuario y contraseña, y clicar el boton de login. (usaremos una web de pruebas real)
  await loginPage.login(
    testData.validUser.username,
    testData.validUser.password,
  );

  // 3. Validar que entramos (Aserción)
  await expect(page).toHaveURL(testData.inventoryURL);
});

test("TC-02: Login Fallido (Sad Path)", async ({ page }) => {
  //Instanciamos la clase LoginPage
  const loginPage = new LoginPage(page);

  // 1. Ir a la página de Login
  await loginPage.navigateTo();

  // 2. Escribir usuario correcto y constraseña incorrecta y clicar el boton de login.
  await loginPage.login(
    testData.validUser.username,
    testData.invalidPassword.password,
  );

  // 3. Validar que no entramos y vemos el mensaje de error (Aserción)
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    testData.invalidPassword.description,
  );
});

test("TC-03: Login Fallido (Sad Path) - Usuario vacio", async ({ page }) => {
  //Instanciamos la clase LoginPage
  const loginPage = new LoginPage(page);

  // 1. Ir a la página de Login
  await loginPage.navigateTo();

  // 2. Escribir usuario vacio y contraseña correcta y clicar el boton de login.
  await loginPage.login(
    testData.emptyUser.username,
    testData.emptyUser.password,
  );

  // 3. Validar que no entramos y vemos el mensaje de error (Aserción)
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toContainText(
    testData.emptyUser.description,
  );
});
