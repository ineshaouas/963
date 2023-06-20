import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlanifiagenComponent } from './list-planifiagen.component';

describe('ListPlanifiagenComponent', () => {
  let component: ListPlanifiagenComponent;
  let fixture: ComponentFixture<ListPlanifiagenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPlanifiagenComponent]
    });
    fixture = TestBed.createComponent(ListPlanifiagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
