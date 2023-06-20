import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgancescComponent } from './agancesc.component';

describe('AgancescComponent', () => {
  let component: AgancescComponent;
  let fixture: ComponentFixture<AgancescComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgancescComponent]
    });
    fixture = TestBed.createComponent(AgancescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
