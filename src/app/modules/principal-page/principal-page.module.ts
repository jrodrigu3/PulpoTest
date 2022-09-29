import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalPageRoutingModule, routes } from './principal-page-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { PrincipalPageComponent } from './principal-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { SpinnerIntercepor } from 'src/app/shared/interceptors/spinner.interceptor';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/material.module';
@NgModule({
  declarations: [
    TarjetaComponent,
    PrincipalPageComponent,
    NavBarComponent,
  ],
  imports: [
    CommonModule,
    PrincipalPageRoutingModule,
    HttpClientModule,
    TranslateModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    InfiniteScrollModule,
    MaterialModule

  ],
  providers: [
    MovieService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerIntercepor, multi: true }
  ],
  exports: [
  ]
})
export class PrincipalPageModule { }
