import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTransactionComponent } from './modal-transaction.component';

describe('ModalTransactionComponent', () => {
  let component: ModalTransactionComponent;
  let fixture: ComponentFixture<ModalTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ModalTransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
