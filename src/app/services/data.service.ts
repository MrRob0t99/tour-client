import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse } from '../response/response';
import { throwError } from 'rxjs';

export class DataService {
    constructor(private http: HttpClient, private uri: string) { }

    getAll<T>(param: HttpParams = null, path: string = null) {
        const url = path ? this.uri + path : this.uri;
        return this.http.get<AppResponse<T>>(url, { params: param }).catch(this.handlerError);
    }

    post(body: any) {
        return this.http.post<AppResponse<number>>(this.uri, body);
    }

    delete(id: number) {
        return this.http.delete<AppResponse<boolean>>(this.uri + id).catch(this.handlerError);
    }

    getById<T>(id: number) {
        return this.http.get<AppResponse<T>>(this.uri + id).catch(this.handlerError);
    }

    private handlerError(response: HttpErrorResponse) {
        return Observable.throw(response.error.error);
    }
}
