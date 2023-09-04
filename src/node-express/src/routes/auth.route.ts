import { AuthController } from "@/controllers/auth.controller";
import { Routes } from "@/interfaces/routes.interface";
import { Router } from "express";

export class AuthRoute implements Routes {
  public path?: string;
  public router: Router;
  private auth = new AuthController();

  constructor() {
    this.path = "/auth";
    this.router = Router();

    this.init();
  }

  private init() {
    this.router.post(`${this.path}/signup`, this.auth.SignUp);
    this.router.post(`${this.path}/login`, this.auth.LogIn);
  }
}
