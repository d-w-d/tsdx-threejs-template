import { TestBed } from '@angular/core/testing';

import { NgxWrapperService } from './ngx-wrapper.service';

describe('NgxWrapperService', () => {
  let service: NgxWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
