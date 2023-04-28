import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Account, FinanceAccountType } from 'src/models';
import { ButtonModule } from 'primeng/button';
import { errorTailorImports } from '@ngneat/error-tailor';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';
import { AlertService } from 'src/app/services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-modal-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    errorTailorImports,
    DividerModule,
  ],
  templateUrl: './modal-account.component.html',
  styleUrls: ['./modal-account.component.css'],
})
export class ModalAccountComponent {
  /** Set modal visibility. */
  @Input() set isVisible(value: boolean) {
    this._isVisible = value;
    this.isVisibleChange.emit(this._isVisible);
  }

  /** Emit visibility value. */
  @Output() isVisibleChange = new EventEmitter<boolean>();

  /** Form builder. */
  private _fb = inject(FormBuilder);

  /** User service. */
  private _userService = inject(UserService);

  /** Account service. */
  private _accountService = inject(AccountService);

  /** Alert service. */
  private _alertService = inject(AlertService);

  /** If the modal is visible. */
  private _isVisible = false;

  /**
   * If the modal is visible.
   *
   * @returns True if visible, false otherwise.
   */
  get isVisible(): boolean {
    return this._isVisible;
  }

  /** If the information is being saved. */
  isSaving = false;

  /** Account form. */
  accountForm = this._fb.group({
    name: ['', Validators.required],
    typeAccount: [0, Validators.required],
    balance: [0, [Validators.required, Validators.min(0)]],
    userId: [this._userService.user?.id],
  });

  /** Account types. */
  accountTypes = [
    {
      label: 'Banco',
      value: FinanceAccountType.Bank,
    },
    {
      label: 'Efectivo',
      value: FinanceAccountType.Cash,
    },
  ];

  /**
   * Save the account info.
   */
  saveAccount(): void {
    this.isSaving = true;
    this._accountService
      .createAccount(this.accountForm.value as Account)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this._alertService.displayMessage({
            severity: 'success',
            summary: 'Cuenta guardada exitosamente',
          });
        },
        error: (err: unknown) => {
          this.isSaving = false;
          this._alertService.displayMessage({
            severity: 'error',
            summary:
              (err as HttpErrorResponse)?.error?.error ||
              'Ha ocurrido un error',
          });
        },
      });
  }
}
