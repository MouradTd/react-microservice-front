// generate a errorType class to handle error from server
export class ErrorType {
    public code: string;
    public statusCode: number;
    public message: string;
    public details: string;

    constructor(code: string, message: string, details: string, statusCode: number) {
        this.code = code;
        this.message = message;
        this.details = details;
        this.statusCode = statusCode;
    }
    
}
