import { NextFunction, Request, Response } from "express";
import { ErrorTypes } from "../constants/project_constants";
import { HTTPStatusCodes } from "../constants/http_status_codes";
import { HttpException } from "../exceptions/http_exception";

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const error: HttpException = new HttpException({
      type: ErrorTypes.NOT_FOUND,
      message: `The requested route (${req.originalUrl}) could not be found in the system.`,
      status: HTTPStatusCodes.NOT_FOUND,
      details: {
        suggestions: [
          "check the method used [GET, POST, PATCH, PUT, DELETE, ...]",
          `check for spelling error on the url='${req.originalUrl}'`,
        ],
      },
    });

    next(error);
  } catch (error) {
    next(error);
  }
};
