import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminfooterComponent } from './adminfooter.component';

describe('AdminfooterComponent', () => {
  let component: AdminfooterComponent;
  let fixture: ComponentFixture<AdminfooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminfooterComponent]
    });
    fixture = TestBed.createComponent(AdminfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});