import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFacturationComponent } from './list-facturation.component';

describe('ListFacturationComponent', () => {
  let component: ListFacturationComponent;
  let fixture: ComponentFixture<ListFacturationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFacturationComponent]
    });
    fixture = TestBed.createComponent(ListFacturationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
