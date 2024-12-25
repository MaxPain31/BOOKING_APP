import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedPlacesPage } from './saved-places.page';

describe('SavedPlacesPage', () => {
  let component: SavedPlacesPage;
  let fixture: ComponentFixture<SavedPlacesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPlacesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
