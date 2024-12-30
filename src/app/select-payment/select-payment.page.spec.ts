import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPaymentPage } from './select-payment.page';

describe('SelectPaymentPage', () => {
  let component: SelectPaymentPage;
  let fixture: ComponentFixture<SelectPaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
