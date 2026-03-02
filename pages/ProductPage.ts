import { Locator, Page } from "@playwright/test";

export class ProductPage {
  // Selectors
  readonly page: Page;
  readonly inventoryItem: Locator;
  readonly pageTitle: Locator;
  readonly itemPrices: Locator;
  readonly itemNames: Locator;
  readonly selectSortPrices: Locator;
  readonly cartbadge: Locator;
  readonly shoppingCartButton: Locator;
  readonly productNameInCart: Locator;
  readonly itemContainerInCart: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;

    // Localizador generico para cada item, (debería haber 6).
    this.inventoryItem = page.locator(".inventory_item");
    // Titulo de la seccion.
    this.pageTitle = page.locator(".title");
    // Lista de precios de los items.
    this.itemPrices = page.locator(".inventory_item_price");
    // Lista de nombres de los productos.
    this.itemNames = page.locator(".inventory_item_name");
    // Selector para ordenar los precios
    this.selectSortPrices = page.locator(".product_sort_container");
    // El badge es el componente dinámico que muestra la cantidad.
    this.cartbadge = page.locator(".shopping_cart_badge");
    // Boton del carrito
    this.shoppingCartButton = page.locator('[data-test="shopping-cart-link"]');
    // Nombre del producto en el carrito de compras.
    this.productNameInCart = page.locator(".inventory_item_name");
    // Contenedor del item en el carrito, se usa para remover un producto específico.
    this.itemContainerInCart = page.locator('[data-test="inventory-item"]');
  }

  // Methods
  async validateOnPage() {
    await this.pageTitle.waitFor();
    return await this.pageTitle.textContent();
  }

  async getProductCount() {
    return await this.inventoryItem.count();
  }

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

  /** Método genérico para hacer click en un botón dentro de un contenedor específico.
   * @param container - El contenedor donde se encuentra el botón (puede ser un Locator o la Page).
   * @param options - Opciones para identificar el botón, ya sea por nombre o por testId.
   */
  private async clickElement(
    container: Locator | Page,
    options?: { name?: string; testId?: string },
  ) {
    if (options?.testId) {
      await container.locator(`[data-test="${options?.testId}"]`).click();
    } else if (options?.name) {
      await container.getByRole("button", { name: options?.name }).click();
    }
  }

  getCartBadge() {
    return this.cartbadge;
  }

  /**
   * Agrega un producto al carrito desde la página de inventario.
   */
  async addProductToCart(productName: string) {
    const itemContainer = this.inventoryItem.filter({ hasText: productName });
    await this.clickElement(itemContainer, { name: "Add to cart" });
  }

  /**
   * Navega a la página del carrito.
   */
  async goToCart() {
    await this.shoppingCartButton.click();
  }

  /**
   * Remueve un producto específicamente desde la página del carrito.
   */
  async removeProductFromCart(productName: string) {
    const itemContainer = this.itemContainerInCart.filter({
      hasText: productName,
    });
    await this.clickElement(itemContainer, { name: "Remove" });
  }

  /**
   * Navega de vuelta a la lista de productos.
   */
  async continueShopping() {
    await this.clickElement(this.page, { name: "Continue Shopping" });
  }

  async goToCheckout() {
    await this.clickElement(this.page, { name: "Checkout" });
  }

  async cancelCheckout() {
    await this.clickElement(this.page, { name: "Cancel" });
  }
}
