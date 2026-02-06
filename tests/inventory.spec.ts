import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ProductPage } from "@pages/ProductPage";

test("TC-04: Validar carga de productos (Happy Path)", async ({ page }) => {
  // Instanciamos la clase LoginPage
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage
  const productPage = new ProductPage(page);

  // 1. Ir a la pagina de Login
  await loginPage.navigateTo();

  // 2. Login con usuario y contraseña valido.
  await loginPage.login("standard_user", "secret_sauce");

  // 3. Validar que entramos a pagina de productos.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe("Products");

  // 4. Validar que se cargan los productos correctamente.
  const itemsCount = await productPage.getProductCount();
  expect(itemsCount).toBe(6);
});

test("TC-05: Validar el formato de precios ($)", async ({ page }) => {
  // Instanciamos la clase LoginPage.
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage.
  const productPage = new ProductPage(page);

  // 1. Navegar a la pagina de Login.
  await loginPage.navigateTo();
  // 2. Hacer login con usuario y contraseña valido.
  await loginPage.login("standard_user", "secret_sauce");
  // 3. Validar que se carga la pagina de Products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe("Products");
  // 4. Validar que los productos tienen el formato de moneda correcto.
  const prices = await productPage.getAllPrices();

  for (const price of prices) {
    console.log(`Verificando formato de:" ${price}`);
    expect(price).toContain("$");
  }
});

test("TC-06: Validar nombres de productos contra lista maestra", async ({
  page,
}) => {
  // Instanciamos la clase LoginPage.
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage.
  const productPage = new ProductPage(page);

  // 1. Navegar a la pagina de Login.
  await loginPage.navigateTo();
  // 2. Hacer login con usuario y contraseña valido.
  await loginPage.login("standard_user", "secret_sauce");
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe("Products");
  // 4. Validar que los productos tienen los nombres correctos.
  const actualNames = await productPage.getAllProductNames();
  const mainList = [
    "Sauce Labs Backpack",
    "Sauce Labs Bike Light",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Fleece Jacket",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
  ];
  // Se valida longitud de la lista, contenido, y orden exacto.
  console.log("Comparando nombres reales contra lista esperada...");
  expect(actualNames).toEqual(mainList);
});

test("TC-07: Validar que el filtro de menor a mayor ordena numéricamente de forma ascendente.", async ({
  page,
}) => {
  // Instanciamos la clase loginPage.
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage.
  const productPage = new ProductPage(page);

  // 1. Navegar a la pagina de Login.
  await loginPage.navigateTo();
  // 2. Hacer login con usuario y contraseña valido.
  await loginPage.login("standard_user", "secret_sauce");
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe("Products");

  // a. Seleccionamos los precios de menor a mayor.
  const sortPrices = await productPage.selectSortingPrices("lohi");
  console.log("Orden de precios:", sortPrices);
  // b. Traemos todos los precios de la pagina y logeamos su contenido.
  const prices = await productPage.getAllPrices();

  // c. Logica para validar row por row su valor y si es menor que el siguiente.
  
  const cleanedPrice = (price: string) => {
    const clean = price.replace("$", "");
    const numericPrice = parseFloat(clean);
    console.log("cleanedPrice", numericPrice);
    return numericPrice;
  };

  //Array limpio.
  const cleanNumericPrices = prices.map((price, index) => {
    return { index, value: cleanedPrice(price) };
  });

  // Validar que se ordenan los precios menor a mayor (Asercion).
  for (const price of cleanNumericPrices) {
    if (price?.index + 1 <= cleanNumericPrices?.length - 1) {
      const currentValue = price?.value;
      const nextValue = cleanNumericPrices[price?.index + 1]?.value;
      expect(currentValue).toBeLessThanOrEqual(nextValue);
    }
  }
});

test("TC-08: Validar que el filtro de mayor a menor ordena numéricamente de forma descendente.", async ({
  page,
}) => {
  // Instanciamos la clase loginPage.
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage.
  const productPage = new ProductPage(page);

  // 1. Navegar a la pagina de Login.
  await loginPage.navigateTo();
  // 2. Hacer login con usuario y contraseña valido.
  await loginPage.login("standard_user", "secret_sauce");
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe("Products");

  // a. Seleccionamos los precios de mayor a menor.
  const sortPrices = await productPage.selectSortingPrices("hilo");
  console.log("Orden de precios:", sortPrices);

  // b. Traemos todos los precios de la pagina y logeamos su contenido.
  const prices = await productPage.getAllPrices();

  // c. Logica para validar row por row su valor y si es menor que el siguiente.
  const cleanedPrice = (price: string) => {
    const clean = price.replace("$", "");
    const numericPrice = parseFloat(clean);
    console.log("cleanedPrice", numericPrice);
    return numericPrice;
  };

  //Array limpio.
  const cleanNumericPrices = prices.map((price, index) => {
    return { index, value: cleanedPrice(price) };
  });

  // Validar que se ordenan los precios menor a mayor (Asercion).
  for (const price of cleanNumericPrices) {
    if (price?.index + 1 <= cleanNumericPrices?.length - 1) {
      const currentValue = price?.value;
      const nextValue = cleanNumericPrices[price?.index + 1]?.value;
      expect(currentValue).toBeGreaterThanOrEqual(nextValue);
    }
  }
});
