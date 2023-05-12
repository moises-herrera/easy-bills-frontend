import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpendingTransactionsWidgetComponent } from './spending-transactions-widget.component';

describe('SpendingTransactionsWidgetComponent', () => {
  let component: SpendingTransactionsWidgetComponent;
  let fixture: ComponentFixture<SpendingTransactionsWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpendingTransactionsWidgetComponent]
    });
    fixture = TestBed.createComponent(SpendingTransactionsWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
