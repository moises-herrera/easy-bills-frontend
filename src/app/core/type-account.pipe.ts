import { Pipe, PipeTransform } from '@angular/core';
import { FinanceAccountType } from 'src/models';

@Pipe({
  name: 'typeAccount',
  standalone: true,
})
export class TypeAccountPipe implements PipeTransform {
  private _accounts: { [key: number]: string } = {
    [FinanceAccountType.Bank]: 'Banco',
    [FinanceAccountType.Cash]: 'Efectivo',
  };

  /**
   * Get the name of the type account by an enum value.
   *
   * @param value Value to convert.
   * @returns The name of the type account.
   */
  transform(value: number): string {
    return this._accounts[value];
  }
}
