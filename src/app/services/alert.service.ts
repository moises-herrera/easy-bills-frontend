import { Injectable, inject } from '@angular/core';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

/**
 * Alert service.
 */
@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /** Confirmation service to manage confirm dialog. */
  private _confirmationService = inject(ConfirmationService);

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

  /**
   * Display confirmation dialog.
   *
   * @param acceptAction Function called when the accept event is triggered.
   * @param rejectAction Function called when the reject event is triggered.
   */
  displayConfirm(acceptAction: () => void, rejectAction?: () => void): void {
    this._confirmationService.confirm({
      message: '¿Estás seguro?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: acceptAction,
      reject: rejectAction,
    });
  }
}
