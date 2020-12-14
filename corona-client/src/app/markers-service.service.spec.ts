import { TestBed } from '@angular/core/testing';

import { MarkersServiceService } from './markers.service';

describe('MarkersServiceService', () => {
  let service: MarkersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
