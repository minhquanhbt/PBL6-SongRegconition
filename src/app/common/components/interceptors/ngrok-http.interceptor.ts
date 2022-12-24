import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse  } from '@angular/common/http';



@Injectable()
export class NgrokInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers = req.headers
            .set('ngrok-skip-browser-warning', '69420');
        const ngrokReq = req.clone({ headers });
        return next.handle(ngrokReq)
    }
}
