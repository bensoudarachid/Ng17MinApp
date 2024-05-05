import { TestBed } from '@angular/core/testing';

import { HttpImageService } from './http-image.service';

describe('HttpImageService', () => {
  let service: HttpImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
