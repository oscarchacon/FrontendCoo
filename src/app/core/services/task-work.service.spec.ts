import { TestBed } from '@angular/core/testing';

import { TaskWorkService } from './task-work.service';

describe('TaskWorkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskWorkService = TestBed.get(TaskWorkService);
    expect(service).toBeTruthy();
  });
});
