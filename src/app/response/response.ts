import { AppError } from './error';

export class AppResponse<T> {
    public data: T;
    public error: AppError;
}
