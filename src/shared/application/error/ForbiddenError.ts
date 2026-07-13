import { ApplicationError } from "./ApplicationError";

export class ForbiddenError extends ApplicationError {

  readonly statusCode = 403;

}