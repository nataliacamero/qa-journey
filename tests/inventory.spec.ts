import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ProductPage } from "@pages/ProductPage";
import {
  MAIN_LIST,
  PRODUCT_NAME,
  TEXT_TO_HAVE_ONE_PRODUCT,
  TITLE_PRODUCT_PAGE,
} from "./constants";

import testData from "./data/users.json";

test("TC-04: Validar carga de productos (Happy Path)", async ({ page }) => {
  // Instanciamos la clase LoginPage
  const loginPage = new LoginPage(page);
  // Instanciamos la clase ProductPage
  const productPage = new ProductPage(page);

  // 1. Ir a la pagina de Login
  await loginPage.navigateTo();

  // 2. Login con usuario y contraseña valido.
  await loginPage.login(
    testData.validUser.username,
    testData.validUser.password,
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
    testData.validUser.username,
    testData.validUser.password,
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
    testData.validUser.username,
    testData.validUser.password,
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
    testData.validUser.username,
    testData.validUser.password,
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
    testData.validUser.username,
    testData.validUser.password,
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
    testData.validUser.username,
    testData.validUser.password,
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
    testData.validUser.username,
    testData.validUser.password,
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
    testData.validUser.username,
    testData.validUser.password,
  );
  // 3. Validar que se carga la pagina de products.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);

  // 1. Verificar estado inicial (Baseline): El badge no debe ser visible.
  // SauceDemo no renderiza el badge si el carrito está vacío.
  const cartBadgeSelector = productPage.getCartBadge();
  await expect(cartBadgeSelector).toBeHidden();

  // 2. Acción: Añadir un producto específico.
  await productPage.addProductToCart(PRODUCT_NAME);

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
    testData.validUser.username,
    testData.validUser.password,
  );
  // 3. Validamos si estamos en la pagina de productos.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);
  // 4. Verificamos el estado inicial del carrito.
  const cartBadge = productPage.getCartBadge();
  await expect(cartBadge).toBeHidden();
  // 5. Añadimos un producto al carrito.
  await productPage.addProductToCart(PRODUCT_NAME);
  // 6. Validamos los efectos secundarios del triguer.
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText(TEXT_TO_HAVE_ONE_PRODUCT);
  // 7. Click al boton del carrito de compras.
  await productPage.goToCart();
  // 8. Validamos el titulo de la pagina del carrito de compras
  const cartTitleText = await productPage.validateOnPage();
  expect(cartTitleText).toBe("Your Cart");
  //9. validamos que el nombre del producto seleccionado esta en el carrito de compra.
  const productName = productPage.productNameInCart;
  await expect(productName).toBeVisible();
  await expect(productName).toHaveText(PRODUCT_NAME);
});

test("TC-13: Verificar la eliminación del producto del carrito.", async ({
  page,
}) => {
  // Instanciamos las clases LoginPage y ProductPage.
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);

  // 1. Setup y Login
  await loginPage.navigateTo();
  await loginPage.login(
    testData.validUser.username,
    testData.validUser.password,
  );

  // 2. Estado Inicial: Validar página y carrito vacío
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);
  const cartBadge = productPage.getCartBadge();
  await expect(cartBadge).toBeHidden();

  // 3. Acción: Agregar producto y validar Badge
  await productPage.addProductToCart(PRODUCT_NAME);
  //  Validamos los efectos secundarios del triguer.
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText(TEXT_TO_HAVE_ONE_PRODUCT);

  // 4. Navegación: Ir al carrito
  await productPage.goToCart();
  //  Validamos el titulo de la pagina del carrito de compras
  const cartTitleText = await productPage.validateOnPage();
  expect(cartTitleText).toBe("Your Cart");

  await expect(page).toHaveURL(/.*cart.html/);

  // 5. Validación de persistencia: El producto está en el carrito
  const productName = productPage.productNameInCart;
  await expect(productName).toBeVisible();
  await expect(productName).toHaveText(PRODUCT_NAME);

  // 6. Acción: Remover el producto
  await productPage.removeProductFromCart(PRODUCT_NAME);

  // 7. Navegación de retorno: Volver a la lista de productos
  await productPage.continueShopping();

  // 8. Verificación Final: El badge debe estar oculto tras la eliminación
  await expect(cartBadge).toBeHidden();

  // Importante: Siempre validar que volvimos a la URL de inventario
  await expect(page).toHaveURL(/.*inventory.html/);
});

test("TC-14: Verificar la cancelacion del checkout, sin perder progreso en el carrito. Pruebas negativas.", async ({
  page,
}) => {
  // Instanciamos las clases LoginPage y ProductPage.
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);

  // 1. Setup, Login and add product to cart;

  // a. Navegamos a la pagina de login.
  await loginPage.navigateTo();
  await loginPage.login(
    testData.validUser.username,
    testData.validUser.password,
  );
  // b. Validamos si estamos en la pagina de productos.
  const titleText = await productPage.validateOnPage();
  expect(titleText).toBe(TITLE_PRODUCT_PAGE);
  // c. Verificamos el estado inicial del carrito.
  const cartBadge = productPage.getCartBadge();
  await expect(cartBadge).toBeHidden();
  // d. Añadimos un producto al carrito.
  await productPage.addProductToCart(PRODUCT_NAME);
  // e. Validamos los efectos secundarios del triguer.
  await expect(cartBadge).toBeVisible();
  await expect(cartBadge).toHaveText(TEXT_TO_HAVE_ONE_PRODUCT);

  // 2. Navegar al carrito y click en checkout.

  // a. Click al boton del carrito de compras.
  await productPage.goToCart();
  // b. Validamos el titulo de la pagina del carrito de compras
  const cartTitleText = await productPage.validateOnPage();
  expect(cartTitleText).toBe("Your Cart");
  await expect(page).toHaveURL(/.*cart.html/);
  // c. Validar que el producto este en el carrito.
  const productName = productPage.productNameInCart;
  await expect(productName).toBeVisible();
  await expect(productName).toHaveText(PRODUCT_NAME);
  // d. Click en el boton de checkout.
  await productPage.goToCheckout();
  // e. Validamos que estamos en la pagina del checkout.
  const checkoutTitle = await productPage.validateOnPage();
  expect(checkoutTitle).toBe("Checkout: Your Information");
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  // 3. Acción: Cancelar el checkout.

  // a. Click en el boton de cancel
  await productPage.cancelCheckout();
  // b. Validamos que volvemos a la pagina del carrito.
  expect(cartTitleText).toBe("Your Cart");
  await expect(page).toHaveURL(/.*cart.html/);

  // 4. Verificación Final: El producto sigue en el carrito y el badge refleja la cantidad correcta.
  await expect(productName).toBeVisible();
  await expect(productName).toHaveText(PRODUCT_NAME);
});

test("TC-15: Validar proceso de compra completo con chechout.", async ({
  page,
}) => {
  //Instanciamos las clases ProductPage y LoginPage.
  const loginPage = new LoginPage(page);
  const productPage = new ProductPage(page);

  await test.step("1. Setup, Login and add product to cart", async () => {
    // a. Navegamos a la pagina de login y nos logueamos con credenciales validas.
    await loginPage.navigateTo();
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password,
    );

    // b. Validamos si estamos en la pagina de productos.
    await expect(page).toHaveURL(/.*inventory.html/);

    // c. Verificamos el estado inicial del carrito.
    const cartBadge = productPage.getCartBadge();
    await expect(cartBadge).toBeHidden();

    // d. Añadimos un producto al carrito.
    await productPage.addProductToCart(PRODUCT_NAME);

    // e. Validamos los efectos secundarios del triguer.
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText(TEXT_TO_HAVE_ONE_PRODUCT);
  });

  await test.step("2. Navegar al carrito y click en checkout.", async () => {
    // a. Click al boton del carrito de compras.
    await productPage.goToCart();

    // b. Validamos el titulo de la pagina del carrito de compras.
    await expect(page).toHaveURL(/.*cart.html/);

    // c. Validar que el producto este en el carrito.
    const productName = productPage.productNameInCart;
    await expect(productName).toBeVisible();
    await expect(productName).toHaveText(PRODUCT_NAME);

    // d. Click en el boton de checkout.
    await productPage.goToCheckout();

    // e. Validamos que estamos en la pagina del checkout.
    await expect(page).toHaveURL(/.*checkout-step-one.html/);
  });

  await test.step("3. Acción: Completar el formulario de checkout y finalizar compra.", async () => {
    // a. Completamos la primera parte del checkout.
    await productPage.fillCheckoutInformation(testData.checkoutData);
    await expect(page).toHaveURL(/.*checkout-step-two.html/);

    // b. validar persistencia de datos, del producto seleccionado continua en el siguiente paso.
    const productSelected =
      await productPage.getNameOfProductInCart(PRODUCT_NAME);
    await expect(productSelected).toBeVisible();
    await expect(productSelected).toHaveText(PRODUCT_NAME);

    // c. Click en el boton de finish para finalizar la compra.
    await productPage.completePurchase();

    // d. Validamos que la compra se completo y que estamos en la pagina de confirmacion.
    const textCompletePurchase = await productPage.getTextCheckoutComplete();
    await expect(textCompletePurchase).toHaveText("Thank you for your order!");
    await expect(page).toHaveURL(/.*checkout-complete.html/);
  });
});
