import { APIRequestContext } from "@playwright/test";

export class UserController {
  // We define a property to hold the playwright request context.
  readonly request: APIRequestContext;

  // The constuctor initializes the request context when we create the object.
  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // Method to GET all users.
  async getUsers() {
    const response = await this.request.get("/users");
    return response;
  }

  // Method to GET one user.
  async getUser(userId: number) {
    const response = await this.request.get(`/users/${userId}`);
    return response;
  }

  // Method to POST a new user
  async createUser(userData: object) {
    const response = await this.request.post("/users", { data: userData });
    return response;
  }

  // Method to PUT (update) an existing user
  async updateUser(userId: number, userData: object) {
    const response = await this.request.put(`/users/${userId}`, {
      data: userData,
    });
    return response;
  }

  // Method to DELETE a user
  async deleteUser(userId: number) {
    const response = await this.request.delete(`/users/${userId}`);
    return response;
  }

  //   Method get user by email, usin query params.
  async getUserByEmail(email: string) {
    const response = await this.request.get(`/users?email=${email}`);
    return response;
  }
}
