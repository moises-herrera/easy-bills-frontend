import { Injectable, inject } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

/**
 * Alert service.
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {
  /** Message service. */
  private _messageService = inject(MessageService);

  /**
   * Display a message.
   *
   * @param message Message data.
   */
  displayMessage(message: Message): void {
    this._messageService.add(message);
  }
}
