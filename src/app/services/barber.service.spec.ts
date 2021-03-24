import { TestBed } from '@angular/core/testing';

import { BarberService } from './barber.service';

describe('BarberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BarberService = TestBed.get(BarberService);
    expect(service).toBeTruthy();
  });
});
