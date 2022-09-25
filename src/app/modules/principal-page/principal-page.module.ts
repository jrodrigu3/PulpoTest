import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalPageRoutingModule } from './principal-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PrincipalPageRoutingModule,
    HttpClientModule
  ],
  providers: [
    MovieService
  ],
  exports: [
  ]
})
export class PrincipalPageModule { }
