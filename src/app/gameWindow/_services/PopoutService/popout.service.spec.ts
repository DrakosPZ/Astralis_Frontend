import { TestBed } from '@angular/core/testing';

import { PopoutService } from './popout.service';

describe('PopoutServiceService', () => {
  let service: PopoutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopoutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
