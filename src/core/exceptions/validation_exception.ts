import { HTTPStatusCodes } from "../constants/http_status_codes";
import { ErrorTypes } from "../constants/project_constants";
import { HttpException } from "./http_exception";

interface ValidationErrorInterface {
  type: ErrorTypes;
  message: string;
  status: HTTPStatusCodes;
  details: {
    field: string;
    value: any;
    constraints: string[];
  }[];
}

export class ValidationException extends HttpException {
  public type: ErrorTypes;
  public message: string;
  public status: HTTPStatusCodes;
  public details: {
    field: string;
    value: any;
    constraints: string[];
  }[];

  constructor({ type, message, status, details }: ValidationErrorInterface) {
    super({ type, message, status, details });
    this.type = type;
    this.message = message;
    this.status = status;
    this.details = details;
  }
}
