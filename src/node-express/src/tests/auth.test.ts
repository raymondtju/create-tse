import request from "supertest";
import { App } from "@/app";
import { User } from "@/interfaces/user.interface";
import { AuthRoute } from "@/routes/auth.route";

describe("TEST Authorization API", () => {
  let appInstance: App;

  beforeAll(() => {
    const route = new AuthRoute();
    appInstance = new App([route]);
  });

  afterAll(() => {
    // await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
    appInstance.getServer().on("close", () => {
      console.log("Server closed");
    });
  });

  describe("[POST] /auth/signup", () => {
    it("response should have the Create userData", () => {
      const userData: User = {
        email: "user2@user.org",
        password: "12345678",
      };

      return request(appInstance.app)
        .post("/auth/signup")
        .send(userData)
        .expect(201);
    });
  });
});
