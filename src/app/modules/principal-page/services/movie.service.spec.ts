import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from 'src/app/core/material.module';
import { PrincipalPageRoutingModule } from '../principal-page-routing.module';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PrincipalPageRoutingModule,
        HttpClientModule,
        TranslateModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        MaterialModule
      ],

    });

    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
