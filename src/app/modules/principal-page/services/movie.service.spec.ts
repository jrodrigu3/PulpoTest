import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from 'src/app/core/material.module';
import { PrincipalPageRoutingModule } from '../principal-page-routing.module';
import { DataResponse, Search } from 'src/app/core/interfaces/movie.interface';

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



  describe('test for getMovies', () => {
    it('should return the observable ', (doneFn) => {
      service.getMovies(null, 'superman').subscribe((value) => {
        expect(value).toBeTruthy();
        doneFn();
      });
      // AAA
    });


    it('should return the observable ', (doneFn) => {
      service.getMoviesPage(null, 'batman', 2).subscribe((value) => {
        service.getMoviesPage(null, 'batman', 3).subscribe((value) => {
          expect(value).toBeTruthy();
          doneFn();
        });
      });
      // AAA
    });

  });

});
