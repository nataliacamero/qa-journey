import { Locator, Page } from "@playwright/test";

export interface CheckoutData {
  firstName: string;
  lastName: string;
  zipCode: string;
}

export class ProductPage {
  // Locators
  readonly page: Page;
  readonly inventoryItem: Locator;
  readonly cartbadge: Locator;
  readonly shoppingCartButton: Locator;
  readonly itemContainerInCart: Locator;
  readonly pageTitle: Locator;
  readonly itemPrices: Locator;
  readonly itemNames: Locator;
  readonly selectSortPrices: Locator;
  readonly productNameInCart: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly completeCheckoutContainer: Locator;
  readonly cartListContainer: Locator;

  // Botones globales (Únicos) - Definidos como Locators específicos
  readonly checkoutButton: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;

    // Elementos de lista/repetidos
    this.inventoryItem = page.locator(".inventory_item");
    this.itemContainerInCart = page.locator(".cart_item");

    // Elementos únicos
    this.cartbadge = page.locator(".shopping_cart_badge");
    this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');

    // Titulo de la seccion.
    this.pageTitle = page.locator(".title");
    // Lista de precios de los items.
    this.itemPrices = page.locator(".inventory_item_price");
    // Lista de nombres de los productos.
    this.itemNames = page.locator(".inventory_item_name");
    // Selector para ordenar los precios
    this.selectSortPrices = page.locator(".product_sort_container");
    // Nombre del producto en el carrito de compras.
    this.productNameInCart = page.locator(".inventory_item_name");
    // Nombre de la lista
    this.cartListContainer = page.locator('[data-test="cart-list"]');

    // Contenedor del texto final de la compra.
    this.completeCheckoutContainer = page.locator(
      '[data-test="checkout-complete-container"]',
    );

    // Inputs de checkout
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');

    // Usamos getByRole directamente en el constructor para botones únicos.
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.completeHeader = page.getByRole("heading", {
      name: "Thank you for your order!",
    });
  }

  // Helper methods
  private async clickElement(
    scope: Locator | Page,
    options?: { name?: string; testId?: string },
  ) {
    if (options?.testId) {
      await scope.locator(`[data-test="${options?.testId}"]`).click();
    } else if (options?.name) {
      await scope.getByRole("button", { name: options?.name }).click();
    }
  }

  // - - - Acciones de inventario. - - -
  async validateOnPage() {
    return await this.pageTitle.textContent();
  }

  async getProductCount() {
    return await this.inventoryItem.count();
  }

  async addProductToCart(productName: string) {
    const itemContainer = this.inventoryItem.filter({ hasText: productName });
    await itemContainer.getByRole("button", { name: "Add to cart" }).click();
  }

  getCartBadge() {
    return this.cartbadge;
  }

  // - - - Acciones de carrito - - -
  async goToCart() {
    await this.shoppingCartButton.click();
  }

  async removeProductFromCart(productName: string) {
    const itemContainer = this.itemContainerInCart.filter({
      hasText: productName,
    });
    await this.clickElement(itemContainer, { name: "Remove" });
  }

  async continueShopping() {
    await this.clickElement(this.page, { name: "Continue Shopping" });
  }

  async getNameOfProductInCart(productName: string) {
    const container = this.itemContainerInCart;
    return container.getByText(productName);
  }

  async getAllProductNamesInCart() {
    const namesLocator = this.cartListContainer.locator(".inventory_item_name");
    return await namesLocator.allTextContents();
  }

  // - - - Acciones de checkout - - -
  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async cancelCheckout() {
    await this.cancelButton.click();
  }

  async fillCheckoutInformation(data: CheckoutData) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.postalCodeInput.fill(data.zipCode);
    await this.continueButton.click(); // Usamos el locator definido arriba
  }

  async completePurchase() {
    await this.finishButton.click();
  }

  async getTextCheckoutComplete() {
    return this.completeCheckoutContainer.getByRole("heading", {
      name: "Thank you for your order!",
    });
  }

  // - - - Acciones de ordenamiento y validación de productos - - -

  async getAllPrices() {
    return await this.itemPrices.allTextContents();
  }

  async getAllProductNames() {
    return await this.itemNames.allTextContents();
  }

  /**'lohi' (precio bajo a alto), 'hilo' (precio alto a bajo).
   * 'az' (ordenado de la A a la Z), y 'za' (ordenado de la Z a la A).
   */
  async selectSortingPrices(option: string) {
    return await this.selectSortPrices.selectOption(option);
  }

  /**
   * @param price as string
   * @returns a number
   */
  cleanPrice(price: string): number {
    const clean = price.replace("$", "");
    const numericPrice = parseFloat(clean);
    console.log("cleanedPrice", numericPrice);
    return numericPrice;
  }
}
