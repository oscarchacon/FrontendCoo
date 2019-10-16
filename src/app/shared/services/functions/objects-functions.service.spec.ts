import { TestBed } from '@angular/core/testing';

import { ObjectsFunctionsService } from './objects-functions.service';

describe('ObjectsFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectsFunctionsService = TestBed.get(ObjectsFunctionsService);
    expect(service).toBeTruthy();
  });
});
