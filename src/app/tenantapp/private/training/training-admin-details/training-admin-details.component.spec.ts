import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAdminDetailsComponent } from './training-admin-details.component';

describe('TrainingAdminDetailsComponent', () => {
  let component: TrainingAdminDetailsComponent;
  let fixture: ComponentFixture<TrainingAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
