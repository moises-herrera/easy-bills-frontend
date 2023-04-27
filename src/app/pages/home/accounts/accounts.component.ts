import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Account } from 'src/models';
import { AccountService } from 'src/app/services/account.service';
import { TypeAccountPipe } from 'src/app/core/type-account.pipe';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    DividerModule,
    TypeAccountPipe
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
  accounts: Account[] = [];

  /**
   * Initial life cycle method.
   */
  ngOnInit(): void {
    this._accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
    });
  }
}
