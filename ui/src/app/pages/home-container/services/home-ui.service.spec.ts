import { TestBed } from '@angular/core/testing';

import { HomeUiService } from './home-ui.service';

describe('HomeUiService', () => {
  let service: HomeUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
