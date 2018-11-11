import { TestBed } from '@angular/core/testing';

import { BankInfoService } from './bankinfo.service';

describe('BankinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BankInfoService = TestBed.get(BankInfoService);
    expect(service).toBeTruthy();
  });
});
