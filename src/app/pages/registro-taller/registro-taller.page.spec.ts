import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroTallerPage } from './registro-taller.page';

describe('RegistroTallerPage', () => {
  let component: RegistroTallerPage;
  let fixture: ComponentFixture<RegistroTallerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTallerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
