import { TestBed } from '@angular/core/testing';

import { MarkersService } from './markers.service';

describe('MarkersServiceService', () => {
  let service: MarkersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
