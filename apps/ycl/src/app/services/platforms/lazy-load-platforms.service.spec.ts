import { TestBed } from '@angular/core/testing';

import { LazyLoadPlatformsService } from './lazy-load-platforms.service';

describe('LazyLoadPlatformsService', () => {
  let service: LazyLoadPlatformsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyLoadPlatformsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
