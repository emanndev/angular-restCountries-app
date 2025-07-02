import { TestBed } from '@angular/core/testing';

import { CountryApiServiceService } from './country-api.service';

describe('CountryApiServiceService', () => {
  let service: CountryApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
