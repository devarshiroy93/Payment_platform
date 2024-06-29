import { TestBed } from '@angular/core/testing';

import { GlobaUiStoreService } from './globa-ui-store.service';

describe('GlobaUiStoreService', () => {
  let service: GlobaUiStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobaUiStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
