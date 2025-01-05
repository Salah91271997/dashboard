import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.tmdb.api.baseUrl;
  private headers = new HttpHeaders({
    Authorization: `Bearer ${environment.tmdb.api.accessToken}`,
  });

  constructor(private http: HttpClient) {}

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { params });
  }

  post<T>(endpoint: string, body: any, params?: HttpParams): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { params });
  }

  delete<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, { params });
  }

  getWithPagination<T>(
    endpoint: string,
    params?: HttpParams
  ): Observable<ApiResponse<T>> {
    return this.http.get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, {
      headers: this.headers,
      params,
    });
  }
}
