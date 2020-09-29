import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInHeaderComponent } from './log-in-header.component';

describe('LogInHeaderComponent', () => {
  let component: LogInHeaderComponent;
  let fixture: ComponentFixture<LogInHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
