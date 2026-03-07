import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import { ProductPage } from "@pages/ProductPage";
import { MAIN_LIST, PRODUCT_NAME, TEXT_TO_HAVE_ONE_PRODUCT } from "./constants";

import testData from "./data/users.json";

// Declaración de variables globales para las clases de página
let loginPage: LoginPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
  // Instanciamos las clases de página antes de cada test.
  loginPage = new LoginPage(page);
  productPage = new ProductPage(page);

  // Logica comun para repetir antes de cada test.
  await loginPage.navigateTo();
  await loginPage.login(
    testData.validUser.username,
    testData.validUser.password,
  );
  // Validamos que el login fue exitoso antes de empezar cualquier test.
  await expect(page).toHaveURL(/.*inventory.html/);
});

test.describe("Pruebas de la pagina de inventario.", () => {
  test("TC-04: Validar carga de productos (Happy Path)", async () => {
    const itemsCount = await productPage.getProductCount();
    expect(itemsCount).toBe(6);
  });

  test("TC-05: Validar el formato de precios ($)", async () => {
    const prices = await productPage.getAllPrices();

    for (const price of prices) {
      console.log(`Verificando formato de:" ${price}`);
      expect(price).toContain("$");
    }
  });

  test("TC-06: Validar nombres de productos contra lista maestra", async () => {
    const actualNames = await productPage.getAllProductNames();
    // Se valida longitud de la lista, contenido, y orden exacto.
    console.log("Comparando nombres reales contra lista esperada...");
    expect(actualNames).toEqual(MAIN_LIST);
  });

  test("TC-07: Validar que el filtro de menor a mayor ordena numéricamente de forma ascendente.", async () => {
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

  test("TC-08: Validar que el filtro de mayor a menor ordena numéricamente de forma descendente.", async () => {
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

    // Validar que se ordenan los precios menor a mayor (Asercion).
    for (const price of cleanNumericPrices) {
      if (price?.index + 1 <= cleanNumericPrices?.length - 1) {
        const currentValue = price?.value;
        const nextValue = cleanNumericPrices[price?.index + 1]?.value;
        expect(currentValue).toBeGreaterThanOrEqual(nextValue);
      }
    }
  });

  test("TC-09: Validar que el filtro (A to Z) ordena alfabéticamente de forma ascendente.", async () => {
    // a. Seleccionamos los productos de la A a la Z.
    const sortPrices = await productPage.selectSortingPrices("az");
    console.log("Orden de precios:", sortPrices);

    // b. Traemos todos los nombres de los productos.
    const productNames = await productPage.getAllProductNames();

    console.log("productNames", productNames);

    // Validar que se ordenan los precios menor a mayor (Asercion).
    for (const [index, name] of productNames.entries()) {
      if (index + 1 <= productNames?.length - 1) {
        const currentValue = name;
        const nextValue = productNames[index + 1];
        expect(currentValue.localeCompare(nextValue)).toBeLessThanOrEqual(0);
      }
    }
  });

  test("TC-10: Validar que el filtro (Z to A) ordena alfabéticamente de forma descendente.", async () => {
    // a. Seleccionamos los productos de la A a la Z.
    const sortPrices = await productPage.selectSortingPrices("za");
    console.log("Orden de precios:", sortPrices);

    // b. Traemos todos los nombres de los productos.
    const productNames = await productPage.getAllProductNames();
    console.log("productNames", productNames);

    // Validar que se ordenan los precios menor a mayor (Asercion).
    for (const [index, name] of productNames.entries()) {
      if (index + 1 <= productNames?.length - 1) {
        const currentValue = name;
        const nextValue = productNames[index + 1];
        expect(currentValue.localeCompare(nextValue)).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

test("TC-11: Validar incremento del contador del carrito (Badge)", async () => {
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

test.describe("Pruebas de la funcionalidad del carrito de compras.", () => {
  test.beforeEach(async ({ page }) => {
    // Badge: no visible → agregar producto → visible -> ir al carrito.
    const cartBadgeSelector = productPage.getCartBadge();
    await expect(cartBadgeSelector).toBeHidden();
    await productPage.addProductToCart(PRODUCT_NAME);
    await expect(cartBadgeSelector).toBeVisible();
    await expect(cartBadgeSelector).toHaveText(TEXT_TO_HAVE_ONE_PRODUCT);
    await productPage.goToCart();
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test("TC-12: Validar la persistencia de productos en el carrito", async () => {
    const productName = productPage.productNameInCart;
    await expect(productName).toBeVisible();
    await expect(productName).toHaveText(PRODUCT_NAME);
  });

  test("TC-13: Verificar la eliminación del producto del carrito.", async ({
    page,
  }) => {
    // a. Validación de persistencia: El producto está en el carrito
    const productName = productPage.productNameInCart;
    await expect(productName).toBeVisible();
    await expect(productName).toHaveText(PRODUCT_NAME);

    // b. Acción: Remover el producto
    await productPage.removeProductFromCart(PRODUCT_NAME);

    // c. Navegación de retorno: Volver a la lista de productos
    await productPage.continueShopping();

    // d. Verificación Final: El badge debe estar oculto tras la eliminación
    const cartBadge = productPage.getCartBadge();
    await expect(cartBadge).toBeHidden();

    // Importante: Siempre validar que volvimos a la URL de inventario
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("TC-14: Verificar la cancelacion del checkout, sin perder progreso en el carrito. Pruebas negativas.", async ({
    page,
  }) => {
    // a. Validar que el producto este en el carrito.
    const productName = productPage.productNameInCart;
    await expect(productName).toBeVisible();
    await expect(productName).toHaveText(PRODUCT_NAME);

    // b. Click en el boton de checkout.
    await productPage.goToCheckout();

    // c. Validamos que estamos en la pagina del checkout.
    const checkoutTitle = await productPage.validateOnPage();
    expect(checkoutTitle).toBe("Checkout: Your Information");
    await expect(page).toHaveURL(/.*checkout-step-one.html/);

    // Acción: Cancelar el checkout.

    // a. Click en el boton de cancel
    await productPage.cancelCheckout();

    // b. Validamos que volvemos a la pagina del carrito.
    await expect(page).toHaveURL(/.*cart.html/);

    // Verificación Final: El producto sigue en el carrito y el badge refleja la cantidad correcta.
    await expect(productName).toBeVisible();
    await expect(productName).toHaveText(PRODUCT_NAME);
  });

  test("TC-15: Validar proceso de compra completo con chechout.", async ({
    page,
  }) => {
    await test.step("Navegar al carrito y click en checkout.", async () => {
      // a. Validar que el producto este en el carrito.
      const productName = productPage.productNameInCart;
      await expect(productName).toBeVisible();
      await expect(productName).toHaveText(PRODUCT_NAME);

      // b. Click en el boton de checkout.
      await productPage.goToCheckout();

      // c. Validamos que estamos en la pagina del checkout.
      await expect(page).toHaveURL(/.*checkout-step-one.html/);
    });

    await test.step("Acción: Completar el formulario de checkout y finalizar compra.", async () => {
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
      await expect(textCompletePurchase).toHaveText(
        "Thank you for your order!",
      );
      await expect(page).toHaveURL(/.*checkout-complete.html/);
    });
  });
});
