import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickUpLocationPage } from './pick-up-location.page';

describe('PickUpLocationPage', () => {
  let component: PickUpLocationPage;
  let fixture: ComponentFixture<PickUpLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUpLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
