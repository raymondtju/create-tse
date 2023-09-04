import { NextFunction, Request, Response } from "express";

import { type HTTPException } from "@/exceptions/index";

export const ErrorMiddleware = (
  error: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || "Something went wrong";

    res.status(status).json({ message });
  } catch (error) {
    console.log(error);
  }
};
