import { ApplicationError }
from "./ApplicationError";


export class ConflictError
extends ApplicationError {


readonly statusCode = 409;


}