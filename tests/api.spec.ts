import { expect, test } from "@playwright/test";
import { UserController } from "controllers/UserControllers";

interface IResponseBodyJSONPlaceHolder {
  name: string;
  job: string;
  id: number;
}

type IResponseBodyUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: [Object];
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

test.describe("Pruebas del backend", () => {
  test("TC-016: Validar respuesta GET de lista de usuarios (API)", async ({
    request,
  }) => {
    // Instanciamos la clase UserContller para usar sus métodos.
    const userController = new UserController(request);

    const response = await userController.getUsers();
    expect(response.status()).toBe(200);

    const responseBody: IResponseBodyUser[] = await response.json();
    console.log("json response", responseBody);

    expect(responseBody.length).toBeGreaterThan(0);
  });

  test("Validar creación de usuario mediante POST (API)", async ({
    request,
  }) => {
    // Instanciamos la clase UserContller para usar sus métodos.
    const userController = new UserController(request);

    // Preparamos los datos que usaremos al servidor
    const newUserData = {
      name: "Mateito Amado",
      job: "Senior SDTE",
    };

    const response = await userController.createUser(newUserData);

    // Validadmos el status code de creacion del registro o recurso 201.
    expect(response.status()).toBe(201);

    // Extraemos la respuesta del servidor.
    const responseBody: IResponseBodyJSONPlaceHolder = await response.json();
    console.log("responseBody", responseBody);

    expect(responseBody.name).toBe(newUserData.name);
    expect(responseBody.id).toBeDefined();
  });

  test("TC-18: Validar actualización de usuario mediante PUT (API)", async ({
    request,
  }) => {
    // Instanciamos la clase UserContller para usar sus métodos.
    const userController = new UserController(request);

    // Preparamos los datos que nesitaremos
    const userId = 1;
    const newDataUser = {
      name: "Mateito Amado",
      job: "SDTE",
    };

    // const response = await request.put("/users/1", { data: newDataUser });
    const response = await userController.updateUser(userId, newDataUser);
    expect(response.status()).toBe(200);

    const responseBody: IResponseBodyJSONPlaceHolder = await response.json();
    console.log("responseBody", responseBody);

    expect(responseBody.name).toBe(newDataUser.name);
    expect(responseBody.job).toBe(newDataUser.job);
  });

  test("TC-19: Validar eliminación de usuario mediante DELETE (API)", async ({
    request,
  }) => {
    // Instanciamos la clase UserContller para usar sus métodos.
    const userController = new UserController(request);

    const userId = 1;
    const response = await userController.deleteUser(userId);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("responseBody del DELETE", responseBody);

    expect(Object.keys(responseBody).length).toBe(0);
  });

  test("TC-20: Validar código 404 al buscar un usuario que NO existe (Edge Case)", async ({
    request,
  }) => {
    // Instanciamos la clase UserContller para usar sus métodos.
    const userController = new UserController(request);

    const nonExistentUser = 99999;

    const response = await userController.getUser(nonExistentUser);
    // 404: Not found.
    expect(response.status()).toBe(404);
  });

  test("TC-21: Validar código 401 Unauthorized por falta de password", async ({
    request,
  }) => {
    // Nota: sobreescribimos temporalmente la Base url.
    const invalidPayload = {
      email: "sidney@fife",
      // no enviamos password a proposito.
    };
    const response = await request.post("https://reqres.in/api/register", {
      data: invalidPayload,
    });

    console.log("response", response);

    // 401: Unauthorized
    expect(response.status()).toBe(401);

    const responseBody = await response.json();
    console.log("responseBody", responseBody);

    // Validamos que la respuesta nos haya avisado del error.
    expect(responseBody).toHaveProperty("error");
  });

  test("TC-22: Filtrar usuario mediante Query Parameters", async ({
    request,
  }) => {
    // Instanciamos la clase UserContller para usar sus métodos.
    const userController = new UserController(request);
    const targetEmail = "Sincere@april.biz";

    const response = await userController.getUserByEmail(targetEmail);
    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    console.log("responseBody", responseBody);

    // La API devuelve un array.
    expect(responseBody.length).toBe(1);
    expect(responseBody[0].email).toBe(targetEmail);
  });
});
