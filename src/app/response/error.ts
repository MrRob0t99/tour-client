export class AppError {
    public errorCode: number;
    public errorDescription: string;

    constructor( description: string, errorCode: number = 500) {
        this.errorDescription = description;
        this.errorCode = errorCode;
    }

}
