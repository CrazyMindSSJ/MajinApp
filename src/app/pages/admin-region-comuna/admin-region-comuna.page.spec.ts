import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminRegionComunaPage } from './admin-region-comuna.page';

describe('AdminRegionComunaPage', () => {
  let component: AdminRegionComunaPage;
  let fixture: ComponentFixture<AdminRegionComunaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegionComunaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
