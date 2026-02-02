import { Locator, Page } from "@playwright/test";

export class ProductPage {
  // Selectors
  readonly page: Page;
  readonly inventoryList: Locator;
  readonly inventoryItems: Locator;
  readonly pageTitle: Locator;
  readonly itemPrices: Locator;

  // Constructor
  constructor(page: Page) {
    this.page = page;

    // Localizador del contenedor principal de la lista.
    this.inventoryList = page.locator(".inventory_list");
    // Localizador generico para cada item, (debería haber 6).
    this.inventoryItems = page.locator(".inventory_item");
    // Titulo de la seccion.
    this.pageTitle = page.locator(".title");
    // Lista de precios de los items.
    this.itemPrices = page.locator(".inventory_item_price");
  }
  // Methods
  async validateOnPage() {
    await this.pageTitle.waitFor();
    return await this.pageTitle.textContent();
  }

  async getProductCount() {
    return await this.inventoryItems.count();
  }

  async getAllPrices() {
    return await this.itemPrices.allTextContents();
  }
}
