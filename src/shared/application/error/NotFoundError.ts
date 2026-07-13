import { ApplicationError } 
from "./ApplicationError";


export class NotFoundError 
extends ApplicationError {


readonly statusCode = 404;


}