import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CotisationComponent } from './cotisation.component';

describe('CotisationComponent', () => {
  let component: CotisationComponent;
  let fixture: ComponentFixture<CotisationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CotisationComponent]
    });
    fixture = TestBed.createComponent(CotisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
