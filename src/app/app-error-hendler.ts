import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
    handleError() {
        alert('Not excepted error');
    }
}
