import { TestBed } from '@angular/core/testing';

import { MyProcessService } from './my-process.service';

describe('MyProcessService', () => {
  let service: MyProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
