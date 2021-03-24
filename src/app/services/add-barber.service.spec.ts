import { TestBed } from '@angular/core/testing';

import { AddBarberService } from './add-barber.service';

describe('AddBarberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddBarberService = TestBed.get(AddBarberService);
    expect(service).toBeTruthy();
  });
});
