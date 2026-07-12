export class ApiResponse<T> {

    constructor(

        public readonly success: boolean,

        public readonly message: string,

        public readonly data?: T

    ) {}

    static success<T>(

        data: T,

        message = "Operation completed successfully"

    ): ApiResponse<T> {

        return new ApiResponse(true, message, data);

    }

}