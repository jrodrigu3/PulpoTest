import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PrincipalPageComponent } from './principal-page.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PrincipalPageComponent },
      { path: 'asd', component: NavBarComponent },
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
