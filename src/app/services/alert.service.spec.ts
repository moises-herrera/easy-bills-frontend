import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmationService, MessageService]
    });
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
