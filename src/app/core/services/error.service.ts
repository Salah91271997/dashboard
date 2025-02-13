import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorSubject = new BehaviorSubject<string | null>(null);
  error$ = this.errorSubject.asObservable();

  setError(message: string): void {
    this.errorSubject.next(message);
    setTimeout(() => this.clearError(), 5000);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
