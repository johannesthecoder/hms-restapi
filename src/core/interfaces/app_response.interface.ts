import { HttpException } from "../exceptions/http_exception";

export interface AppResponse {
  success: boolean;
  error?: HttpException;
  result?: any;
}
