import { Message } from 'primeng/api';

/**
 * Mock alert service.
 */
export class MockAlertService {
  /**
   * Display a message.
   *
   * @param message Message data.
   */
  displayMessage(message: Message): void {
    return;
  }

  /**
   * Display confirmation dialog.
   *
   * @param acceptAction Function called when the accept event is triggered.
   * @param rejectAction Function called when the reject event is triggered.
   */
  displayConfirm(acceptAction: () => void, rejectAction?: () => void): void {
    return;
  }
}
