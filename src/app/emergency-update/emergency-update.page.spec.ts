import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmergencyUpdatePage } from './emergency-update.page';

describe('EmergencyUpdatePage', () => {
  let component: EmergencyUpdatePage;
  let fixture: ComponentFixture<EmergencyUpdatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
