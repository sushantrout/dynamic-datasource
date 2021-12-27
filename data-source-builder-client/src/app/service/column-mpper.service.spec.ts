import { TestBed } from '@angular/core/testing';

import { ColumnMpperService } from './column-mpper.service';

describe('ColumnMpperService', () => {
  let service: ColumnMpperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColumnMpperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
