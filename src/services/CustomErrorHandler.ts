class CustomErrorHandler extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message); 
        this.status = status;

        Object.setPrototypeOf(this, CustomErrorHandler.prototype);
    }

    static alreadyExist(message: string): CustomErrorHandler {
        return new CustomErrorHandler(409, message);
    }

    static wrongCredentials(message = "Username and Password is wrong"): CustomErrorHandler {
        return new CustomErrorHandler(409, message);
    }

    static unAuthorized(message = "Unauthorized"): CustomErrorHandler {
        return new CustomErrorHandler(401, message);
    }

    static notFound(message = "404 Not Found"): CustomErrorHandler {
        return new CustomErrorHandler(404, message);
    }

    static serverError(message = "Internal Server Error"): CustomErrorHandler {
        return new CustomErrorHandler(500, message);
    }
}

export default CustomErrorHandler;
