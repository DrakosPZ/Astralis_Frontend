import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs';
import { tap } from 'rxjs/operators';

const XSSI_PREFIX = /^\)\]\}',?\n/;

/**
 * Provide custom json parsing capabilities for api requests.
 * @export
 * @class ApiInterceptor
 */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  iso8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body;
        this.convertToDate(body);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
        }
      }
    }));
  }

  convertToDate(body) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.isIso8601(value)) {
        body[key] = new Date(value);
      } else if (typeof value === 'object') {
        this.convertToDate(value);
      }
    }
  }

  isIso8601(value) {
    if (value === null || value === undefined) {
      return false;
    }

    return this.iso8601.test(value);
  }
}