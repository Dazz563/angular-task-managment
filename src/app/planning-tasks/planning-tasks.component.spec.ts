import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningTasksComponent } from './planning-tasks.component';

describe('PlanningTasksComponent', () => {
  let component: PlanningTasksComponent;
  let fixture: ComponentFixture<PlanningTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
