import { User } from "@/interfaces/user.interface";
import { AuthService } from "@/services/auth.service";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";

export class AuthController {
  public auth = Container.get(AuthService);

  public SignUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      const result: User = await this.auth.signup(userData);

      res.status(201).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public LogIn = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userData: User = req.body;
      const result = await this.auth.login(userData);

      // res.cookie("cookiess", userData.email, {
      //   maxAge: 60 * 60,
      //   path: "/",
      // });
      res.setHeader("Set-Cookie", [result.cookie]);
      res.status(200).json({
        data: result.findUser,
      });
    } catch (error) {
      next(error);
    }
  };
}
