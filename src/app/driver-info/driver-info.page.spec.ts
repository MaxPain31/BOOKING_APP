import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverInfoPage } from './driver-info.page';

describe('DriverInfoPage', () => {
  let component: DriverInfoPage;
  let fixture: ComponentFixture<DriverInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
