import { TestBed } from '@angular/core/testing';

import { MypiService } from './mypi.service';

describe('MypiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MypiService = TestBed.get(MypiService);
    expect(service).toBeTruthy();
  });
});
