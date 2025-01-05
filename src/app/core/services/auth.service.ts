import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { ApiService } from './api.service';
import {
  AuthUser,
  RequestTokenResponse,
  SessionResponse,
  AccountResponse,
  CreateUserRequest,
  CreateUserResponse,
} from '../models/auth.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_KEY = 'auth_user';
  private authState = new BehaviorSubject<AuthUser | null>(null);
  readonly auth$ = this.authState.asObservable();

  constructor(private apiService: ApiService, private router: Router) {
    this.checkStoredAuth();
  }

  login(credentials: { email: string; password: string }): Observable<boolean> {
    return this.getRequestToken().pipe(
      switchMap((token) => this.validateWithLogin(credentials, token)),
      switchMap((token) => this.createSession(token)),
      switchMap((sessionId) => this.getAccount(sessionId)),
      tap((user) => this.setAuthState(user)),
      map(() => true),
      catchError((error) => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  createGuestSession(): Observable<boolean> {
    return this.apiService
      .get<{ success: boolean; guest_session_id: string; expires_at: string }>(
        '/authentication/guest_session/new'
      )
      .pipe(
        map((response) => {
          if (response.success) {
            const guestUser: AuthUser = {
              id: Date.now(),
              username: 'Guest',
              sessionId: response.guest_session_id,
              isGuest: true,
              expiresAt: response.expires_at,
            };
            this.setAuthState(guestUser);
            return true;
          }
          return false;
        }),
        catchError((error) => {
          console.error('Guest session error:', error);
          return of(false);
        })
      );
  }

  logout(): Observable<boolean> {
    const sessionId = this.authState.value?.sessionId;
    if (!sessionId) {
      this.clearAuth();
      return of(true);
    }

    const params = new HttpParams().set('session_id', sessionId);

    return this.apiService
      .delete<{ success: boolean }>('/authentication/session', params)
      .pipe(
        tap(() => this.clearAuth()),
        map((response) => response.success),
        catchError(() => {
          this.clearAuth();
          return of(true);
        })
      );
  }

  isAuthenticated(): boolean {
    const user = this.authState.value;
    if (!user) return false;

    if (user.isGuest && user.expiresAt) {
      return new Date(user.expiresAt) > new Date();
    }

    return true;
  }

  getCurrentUser(): AuthUser | null {
    return this.authState.value;
  }

  private getRequestToken(): Observable<string> {
    return this.apiService
      .get<RequestTokenResponse>('/authentication/token/new')
      .pipe(
        map((response) => {
          if (!response.success) throw new Error('Failed to get request token');
          return response.request_token;
        })
      );
  }

  private validateWithLogin(
    credentials: { email: string; password: string },
    requestToken: string
  ): Observable<string> {
    return this.apiService
      .post<RequestTokenResponse>('/authentication/token/validate_with_login', {
        username: credentials.email,
        password: credentials.password,
        request_token: requestToken,
      })
      .pipe(
        map((response) => {
          if (!response.success) throw new Error('Login validation failed');
          return response.request_token;
        })
      );
  }

  private createSession(requestToken: string): Observable<string> {
    return this.apiService
      .post<SessionResponse>('/authentication/session/new', {
        request_token: requestToken,
      })
      .pipe(
        map((response) => {
          if (!response.success) throw new Error('Failed to create session');
          return response.session_id;
        })
      );
  }

  private getAccount(sessionId: string): Observable<AuthUser> {
    const params = new HttpParams().set('session_id', sessionId);

    return this.apiService.get<AccountResponse>('/account', params).pipe(
      map((account) => ({
        id: account.id,
        username: account.username,
        sessionId: sessionId,
        isGuest: false,
      }))
    );
  }

  private setAuthState(user: AuthUser | null): void {
    this.authState.next(user);
    if (user) {
      localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(this.AUTH_KEY);
    }
  }

  private clearAuth(): void {
    this.setAuthState(null);
    this.router.navigate(['/auth/login']);
  }

  private checkStoredAuth(): void {
    const storedUser = localStorage.getItem(this.AUTH_KEY);
    if (storedUser) {
      try {
        const user: AuthUser = JSON.parse(storedUser);
        if (
          user.isGuest &&
          user.expiresAt &&
          new Date(user.expiresAt) < new Date()
        ) {
          this.clearAuth();
          return;
        }
        this.authState.next(user);
      } catch (error) {
        this.clearAuth();
      }
    }
  }
  createUser(userData: CreateUserRequest): Observable<boolean> {
    return this.apiService
      .post<CreateUserResponse>('/account/signup', userData)
      .pipe(
        switchMap((response) => {
          if (response.success) {
            return this.login({
              email: userData.username,
              password: userData.password,
            });
          }
          throw new Error(
            response.status_message || 'Failed to create account'
          );
        }),
        catchError((error) => {
          console.error('Account creation error:', error);
          return of(false);
        })
      );
  }
}
