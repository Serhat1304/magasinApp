import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMagasinsComponent } from './list-magasins.component';

describe('ListMagasinsComponent', () => {
  let component: ListMagasinsComponent;
  let fixture: ComponentFixture<ListMagasinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMagasinsComponent]
    });
    fixture = TestBed.createComponent(ListMagasinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
