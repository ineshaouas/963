import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCircuitComponent } from './list-circuit.component';

describe('ListCircuitComponent', () => {
  let component: ListCircuitComponent;
  let fixture: ComponentFixture<ListCircuitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCircuitComponent]
    });
    fixture = TestBed.createComponent(ListCircuitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
