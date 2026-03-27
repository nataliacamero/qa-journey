import { expect, test } from "@playwright/test";

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
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/users",
    );

    expect(response.status()).toBe(200);

    const responseBody: IResponseBodyUser[] = await response.json();
    console.log("json response", responseBody);

    expect(responseBody.length).toBeGreaterThan(0);
  });

  test("Validar creación de usuario mediante POST (API)", async ({
    request,
  }) => {
    // Preparamos los datos que usaremos al servidor
    const newUserData = {
      name: "Mateito Amado",
      job: "Senior SDTE",
    };

    const response = await request.post(
      "https://jsonplaceholder.typicode.com/users",
      { data: newUserData },
    );
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
    // Preparamos los datos que nesitaremos
    const newDataUser = {
      name: "Mateito Amado",
      job: "SDTE",
    };

    const response = await request.put(
      "https://jsonplaceholder.typicode.com/users/1",
      { data: newDataUser },
    );
    expect(response.status()).toBe(200);

    const responseBody: IResponseBodyJSONPlaceHolder = await response.json();
    console.log("responseBody", responseBody);

    expect(responseBody.name).toBe(newDataUser.name);
    expect(responseBody.job).toBe(newDataUser.job);
  });

  test("TC-19: Validar eliminación de usuario mediante DELETE (API)", async ({
    request,
  }) => {
    const response = await request.delete(
      "https://jsonplaceholder.typicode.com/users/1",
    );

    expect(response.status()).toBe(200);
  });
});
