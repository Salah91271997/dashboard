import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private isTmdbRequest(url: string): boolean {
    return url.includes(environment.tmdb.api.baseUrl);
  }

  private addTmdbAuth(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      params: request.params.set('api_key', environment.tmdb.api.apiKey),
      headers: request.headers.set(
        'Authorization',
        `Bearer ${environment.tmdb.api.accessToken}`
      ),
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = this.isTmdbRequest(request.url)
      ? this.addTmdbAuth(request)
      : request;
    return next.handle(modifiedRequest);
  }
}
