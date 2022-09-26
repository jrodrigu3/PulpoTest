import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrincipalPageRoutingModule } from './principal-page-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { PrincipalPageComponent } from './principal-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
@NgModule({
  declarations: [
    TarjetaComponent,
    PrincipalPageComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    PrincipalPageRoutingModule,
    HttpClientModule,
    TranslateModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ],
  providers: [
    MovieService
  ],
  exports: [
  ]
})
export class PrincipalPageModule { }
