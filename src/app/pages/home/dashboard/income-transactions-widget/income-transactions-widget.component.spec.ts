import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTransactionsWidgetComponent } from './income-transactions-widget.component';

describe('IncomeTransactionsWidgetComponent', () => {
  let component: IncomeTransactionsWidgetComponent;
  let fixture: ComponentFixture<IncomeTransactionsWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncomeTransactionsWidgetComponent]
    });
    fixture = TestBed.createComponent(IncomeTransactionsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
