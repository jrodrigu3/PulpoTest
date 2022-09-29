import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalPageComponent } from './principal-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PrincipalPageComponent },
      { path: 'wish-list', component: PrincipalPageComponent },
    ]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalPageRoutingModule { }
