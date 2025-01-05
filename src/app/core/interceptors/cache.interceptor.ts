import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    const cacheKey = request.urlWithParams;
    const cachedResponse = this.cache.get(cacheKey);

    if (
      cachedResponse &&
      Date.now() - cachedResponse.timestamp < this.CACHE_DURATION
    ) {
      return of(new HttpResponse({ body: cachedResponse.data }));
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cache.set(cacheKey, {
            data: event.body,
            timestamp: Date.now(),
          });
        }
      })
    );
  }
}
