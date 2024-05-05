import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingappComponent } from './trainingapp.component';

describe('TrainingappComponent', () => {
  let component: TrainingappComponent;
  let fixture: ComponentFixture<TrainingappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingappComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
