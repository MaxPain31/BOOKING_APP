import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropOffLocationPage } from './drop-off-location.page';

describe('DropOffLocationPage', () => {
  let component: DropOffLocationPage;
  let fixture: ComponentFixture<DropOffLocationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DropOffLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
