import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RideInfoPage } from './ride-info.page';

describe('RideInfoPage', () => {
  let component: RideInfoPage;
  let fixture: ComponentFixture<RideInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RideInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
