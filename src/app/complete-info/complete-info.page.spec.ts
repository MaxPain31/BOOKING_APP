import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteInfoPage } from './complete-info.page';

describe('CompleteInfoPage', () => {
  let component: CompleteInfoPage;
  let fixture: ComponentFixture<CompleteInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
