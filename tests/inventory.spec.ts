import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ProductPage } from "@pages/ProductPage";
import {
  MAIN_LIST,
  PRODUCT_NAME,
  TEXT_TO_HAVE_ONE_PRODUCT,
  TITLE_PRODUCT_PAGE,
  VALID_CREDENTIALS,
} from "./constants";

test("TC-04: Validar carga de productos (Happy Path)", async ({ page }) => {
  // Instanciamos la clase LoginPage
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage
  const productPage = new ProductPage(page);

  // 1. Ir a la pagina de Login
  await loginPage.navigateTo();

  // 2. Login con usuario y contraseña valido.
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );

  // 3. Validar que entramos a pagina de productos.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);

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
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );
  // 3. Validar que se carga la pagina de Products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);
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
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);
  // 4. Validar que los productos tienen los nombres correctos.
  const actualNames = await productPage.getAllProductNames();
  // Se valida longitud de la lista, contenido, y orden exacto.
  console.log("Comparando nombres reales contra lista esperada...");
  expect(actualNames).toEqual(MAIN_LIST);
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
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);

  // a. Seleccionamos los precios de menor a mayor.
  const sortPrices = await productPage.selectSortingPrices("lohi");
  console.log("Orden de precios:", sortPrices);
  // b. Traemos todos los precios de la pagina y logeamos su contenido.
  const prices = await productPage.getAllPrices();

  // c. Logica para validar row por row su valor y si es menor que el siguiente.

  //Array limpio.
  const cleanNumericPrices = prices.map((price, index) => {
    return { index, value: productPage.cleanPrice(price) };
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
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);

  // a. Seleccionamos los precios de mayor a menor.
  const sortPrices = await productPage.selectSortingPrices("hilo");
  console.log("Orden de precios:", sortPrices);

  // b. Traemos todos los precios de la pagina y logeamos su contenido.
  const prices = await productPage.getAllPrices();

  // c. Logica para validar row por row su valor y si es menor que el siguiente.

  //Array limpio.
  const cleanNumericPrices = prices.map((price, index) => {
    return { index, value: productPage.cleanPrice(price) };
  });

  // 4. Validar que se ordenan los precios menor a mayor (Asercion).
  for (const price of cleanNumericPrices) {
    if (price?.index + 1 <= cleanNumericPrices?.length - 1) {
      const currentValue = price?.value;
      const nextValue = cleanNumericPrices[price?.index + 1]?.value;
      expect(currentValue).toBeGreaterThanOrEqual(nextValue);
    }
  }
});

test("TC-09: Validar que el filtro (A to Z) ordena alfabéticamente de forma ascendente.", async ({
  page,
}) => {
  // Instanciamos la clase LoginPage.
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage.
  const productPage = new ProductPage(page);

  // 1. Navegar a la pagina de Login.
  await loginPage.navigateTo();
  // 2. Hacer login con usuario y contraseña valido.
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);

  // a. Seleccionamos los productos de la A a la Z.
  const sortPrices = await productPage.selectSortingPrices("az");
  console.log("Orden de precios:", sortPrices);

  // b. Traemos todos los nombres de los productos.
  const productNames = await productPage.getAllProductNames();

  console.log("productNames", productNames);

  // 4. Validar que se ordenan los precios menor a mayor (Asercion).
  for (const [index, name] of productNames.entries()) {
    if (index + 1 <= productNames?.length - 1) {
      const currentValue = name;
      const nextValue = productNames[index + 1];
      expect(currentValue.localeCompare(nextValue)).toBeLessThanOrEqual(0);
    }
  }
});

test("TC-10: Validar que el filtro (Z to A) ordena alfabéticamente de forma descendente.", async ({
  page,
}) => {
  // Instanciamos la clase LoginPage.
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage.
  const productPage = new ProductPage(page);

  // 1. Navegar a la pagina de Login.
  await loginPage.navigateTo();
  // 2. Hacer login con usuario y contraseña valido.
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);

  // a. Seleccionamos los productos de la A a la Z.
  const sortPrices = await productPage.selectSortingPrices("za");
  console.log("Orden de precios:", sortPrices);

  // b. Traemos todos los nombres de los productos.
  const productNames = await productPage.getAllProductNames();

  console.log("productNames", productNames);

  // 4. Validar que se ordenan los precios menor a mayor (Asercion).
  for (const [index, name] of productNames.entries()) {
    if (index + 1 <= productNames?.length - 1) {
      const currentValue = name;
      const nextValue = productNames[index + 1];
      expect(currentValue.localeCompare(nextValue)).toBeGreaterThanOrEqual(0);
    }
  }
});

test("TC-11: Validar incremento del contador del carrito (Badge)", async ({
  page,
}) => {
  // Instanciamos las clases LoginPage y ProductPage.
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);

  // 1. Navegar a la pagina de Login.
  await loginPage.navigateTo();
  // 2. Hacer login con usuario y contraseña valido.
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);

  // 1. Verificar estado inicial (Baseline): El badge no debe ser visible.
  // SauceDemo no renderiza el badge si el carrito está vacío.
  const cartBadgeSelector = productPage.getCartBadge();
  await expect(cartBadgeSelector).toBeHidden();

  // 2. Acción: Añadir un producto específico.
  await productPage.addingProductToCart(PRODUCT_NAME);

  // 3. Verificación de estado final (Efecto secundario visual).
  // Validamos que el elemento aparezca y que el sistema "recuerde" el estado (1).
  await expect(cartBadgeSelector).toBeVisible();
  await expect(cartBadgeSelector).toHaveText(TEXT_TO_HAVE_ONE_PRODUCT);
});

test("TC-12: Validar la persistencia de productos en el carrito", async ({
  page,
}) => {
  // Instanciamos las clases LoginPage y ProductPage.
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);

  // 1. Navegamos a la pagina de login.
  await loginPage.navigateTo();
  // 2. Nos logueamos con credenciales validas.
  await loginPage.login(
    VALID_CREDENTIALS.usuario,
    VALID_CREDENTIALS.contraseña,
  );
  // 3. Validamos si estamos en la pagina de productos.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);
  // 4. Verificamos el estado inicial del carrito.
  const cartBadge = productPage.getCartBadge();
  await expect(cartBadge).toBeHidden();
  // 5. Añadimos un producto al carrito.
  await productPage.addingProductToCart(PRODUCT_NAME);
  // 6. Validamos los efectos secundarios del triguer.
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText(TEXT_TO_HAVE_ONE_PRODUCT);
  // 7. Click al boton del carrito de compras.
  await productPage.shoppingCartButton.click();
  // 8. Validamos el titulo de la pagina del carrito de compras
  const cartTitleText = await productPage.validateOnPage();
  expect(cartTitleText).toBe("Your Cart");
  //9. validamos que el nombre del producto seleccionado esta en el carrito de compra.
  const productName = productPage.productNameInCart;
  await expect(productName).toBeVisible();
  await expect(productName).toHaveText(PRODUCT_NAME);
});
