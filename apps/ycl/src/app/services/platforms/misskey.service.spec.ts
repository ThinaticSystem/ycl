import { TestBed } from '@angular/core/testing';

import { MisskeyService } from './misskey.service';

describe('MisskeyService', () => {
  let service: MisskeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MisskeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
