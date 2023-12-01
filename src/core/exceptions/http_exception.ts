import { HTTPStatusCodes } from "../constants/http_status_codes";
import { ErrorTypes } from "../constants/project_constants";

interface HttpExceptionInterface {
  type: ErrorTypes;
  message: string;
  status: HTTPStatusCodes;
  details?: {};
}

export class HttpException extends Error {
  public type: ErrorTypes;
  public message: string;
  public status: HTTPStatusCodes;
  public details?: {};

  constructor({ type, message, status, details }: HttpExceptionInterface) {
    super("message");
    this.type = type;
    this.message = message;
    this.status = status;
    this.details = details;

    Object.setPrototypeOf(this, HttpException.prototype);
  }
}
