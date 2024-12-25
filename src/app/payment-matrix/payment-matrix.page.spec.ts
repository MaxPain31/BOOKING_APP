import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentMatrixPage } from './payment-matrix.page';

describe('PaymentMatrixPage', () => {
  let component: PaymentMatrixPage;
  let fixture: ComponentFixture<PaymentMatrixPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMatrixPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
