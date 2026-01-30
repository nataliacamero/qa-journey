import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ProductPage } from "@pages/ProductPage";

test("TC-04: Validar carga de productos (Happy Path)", async ({ page }) => {
  // Instanciamos la clase loginPage
  const loginPage = new LoginPage(page);
  // Instanciamos la clase productPage
  const productPage = new ProductPage(page);

  // 1. Ir a la pagina de Login
  await loginPage.navigateTo();

  // 2. Login con usuario y contraseña valido.
  await loginPage.login("standard_user", "secret_sauce");

  // 3. Validar que entramos a pagima de productos.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe("Products"); // por que aqui no es necesaro el await?

  // 4. Validar que se cargan los productos correctamente
  const itemsCount = await productPage.getProductCount();
  expect(itemsCount).toBe(6);
});
