import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Account } from 'src/models';
import { AccountService } from 'src/app/services/account.service';
import { TypeAccountPipe } from 'src/app/core/type-account.pipe';
import { ModalAccountComponent } from './modal-account/modal-account.component';
import { Observable, map, tap } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    ProgressSpinnerModule,
    TypeAccountPipe,
    ModalAccountComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
})
export class AccountsComponent implements OnInit {
  /** Account service. */
  private _accountService = inject(AccountService);

  /** Search text. */
  search = '';

  /** List of accounts. */
  accounts$!: Observable<Account[]>;

  /** If the account modal is visible. */
  isModalVisible = false;

  /** If the data is loading. */
  isLoading = false;

  /**
   * Initial life cycle method.
   */
  ngOnInit(): void {
    this.isLoading = true;
    this.accounts$ = this._accountService
      .getAccounts()
      .pipe(tap(() => (this.isLoading = false)));
  }

  /**
   * Search accounts.
   */
  searchAccounts(): void {
    this.accounts$ = this.accounts$.pipe(
      map((accounts) =>
        accounts.filter(({ name }) =>
          name.toLowerCase().includes(this.search.toLowerCase())
        )
      )
    );
  }

  /**
   * Show the account modal.
   */
  showAccountModal(): void {
    this.isModalVisible = true;
  }
}
