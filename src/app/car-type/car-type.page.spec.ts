import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarTypePage } from './car-type.page';

describe('CarTypePage', () => {
  let component: CarTypePage;
  let fixture: ComponentFixture<CarTypePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
