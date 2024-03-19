import { NextFunction, Request, Response } from "express";

type TMiddleware = (req: Request, res: Response, next: NextFunction) => void

interface IPrismaModel {
    [modelName: string]: {
      [key]: string;
    };
  }