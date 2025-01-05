import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

export type ErrorType = 'api' | 'network' | 'notFound' | 'generic';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() type: ErrorType = 'generic';
  @Input() message?: string;
  @Input() actionLabel?: string;

  constructor(private location: Location) {}

  getErrorIcon(): string {
    const icons = {
      api: 'pi pi-server',
      network: 'pi pi-wifi',
      notFound: 'pi pi-search',
      generic: 'pi pi-exclamation-circle',
    };
    return icons[this.type];
  }

  getErrorTitle(): string {
    const titles = {
      api: 'API Error',
      network: 'Network Error',
      notFound: 'Not Found',
      generic: 'Error Occurred',
    };
    return titles[this.type];
  }

  getDefaultMessage(): string {
    const messages = {
      api: 'There was a problem fetching data from the server.',
      network: 'Please check your internet connection and try again.',
      notFound: 'The requested resource could not be found.',
      generic: 'An unexpected error occurred. Please try again.',
    };
    return messages[this.type];
  }

  onAction(): void {
    this.location.back();
  }
}
