import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInSidenavListComponent } from './log-in-sidenav-list.component';

describe('LogInSidenavListComponent', () => {
  let component: LogInSidenavListComponent;
  let fixture: ComponentFixture<LogInSidenavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInSidenavListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInSidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
