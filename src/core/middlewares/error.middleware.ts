import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../constants/http_status_codes";
import { ErrorTypes } from "../constants/project_constants";
import { HttpException } from "../exceptions/http_exception";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(error.status || HTTPStatusCodes.INTERNAL_SERVER_ERROR).json(
      new HttpException({
        type: error.type || ErrorTypes.INTERNAL_ERROR,
        message: error.message || "Something went wrong",
        status: error.status || HTTPStatusCodes.INTERNAL_SERVER_ERROR,
        details: error.details,
      })
    );
  } catch (error) {
    next(error);
  }
};
