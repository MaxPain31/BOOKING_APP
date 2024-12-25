import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PreBookPage } from './pre-book.page';

describe('PreBookPage', () => {
  let component: PreBookPage;
  let fixture: ComponentFixture<PreBookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PreBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
