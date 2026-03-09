import { test, expect } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
import testData from "./data/users.json";

let loginPage: LoginPage;
const negativeScenarios = [
  { id: "TC-02", ...testData.invalidPassword },
  { id: "TC-03", ...testData.emptyUser },
];

test.describe("Pruebas de Login (Data-Driven Testing) y concepto: Partición de equivalencias.", () => {
  test.beforeEach(async ({ page }) => {
    //Instanciamos la clase LoginPage
    loginPage = new LoginPage(page);

    // Ir a la página de Login
    await loginPage.navigateTo();
  });

  // 🟢 Particion valida (Happy Path).
  // Mantenemos este test separado porque su aserción es diferente (espera entrar al inventario).
  test("TC-01: Login Exitoso (Happy Path)", async ({ page }) => {
    // Escribir usuario y contraseña, y clicar el boton de login. (usaremos una web de pruebas real)
    await loginPage.login(
      testData.validUser.username,
      testData.validUser.password,
    );

    // 3. Validar que entramos (Aserción)
    await expect(page).toHaveURL(testData.inventoryURL);
  });

  // 🔴 PARTICIÓN INVÁLIDA (Sad Paths)
  // Creamos un array agrupando los escenarios negativos de nuestro JSON y luego iteramos sobre él para crear un test por cada caso.
  for (const scenario of negativeScenarios) {
    test(`${scenario.id}: Login Fallido - ${scenario.description}`, async () => {
      await test.step(`Intentar login con credenciales de ${scenario.id}`, async () => {
        await loginPage.login(scenario.username, scenario.password);
      });

      await test.step("Validar que se muestra el mensaje de error correcto", async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(
          scenario.description,
        );
      });
    });
  }
});
