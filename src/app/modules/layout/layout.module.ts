import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


import { BaseComponent } from './components/base/base.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    BaseComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    LayoutRoutingModule,
    TranslateModule,
  ],
  providers: [
  ]
})
export class LayoutModule { }
