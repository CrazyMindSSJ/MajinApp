import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTalleresPage } from './admin-talleres.page';

describe('AdminTalleresPage', () => {
  let component: AdminTalleresPage;
  let fixture: ComponentFixture<AdminTalleresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTalleresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
