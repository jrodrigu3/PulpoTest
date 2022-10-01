import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaxCharaptersPipe } from './pipes/max-charapters.pipe';

@NgModule({
  declarations: [
    MaxCharaptersPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MaxCharaptersPipe,
  ]
})
export class SharedModule { }
