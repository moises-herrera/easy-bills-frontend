import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

/**
 * Alert service.
 */
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private messageService: MessageService) { }

  /**
   * Display a message.
   *
   * @param message Message data.
   */
  displayMessage(message: Message): void {
    this.messageService.add(message);
  }
}
