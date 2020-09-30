import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameInspectionComponent } from './game-inspection.component';

describe('GameInspectionComponent', () => {
  let component: GameInspectionComponent;
  let fixture: ComponentFixture<GameInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
