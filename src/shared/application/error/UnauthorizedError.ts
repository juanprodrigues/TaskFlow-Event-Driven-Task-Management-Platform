import { ApplicationError }
from "./ApplicationError";


export class UnauthorizedError
extends ApplicationError {


readonly statusCode = 401;


}