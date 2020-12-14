import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewMarkerComponent } from './add-new-marker.component';

describe('AddNewMarkerComponent', () => {
  let component: AddNewMarkerComponent;
  let fixture: ComponentFixture<AddNewMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
