import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalPageComponent } from './principal-page.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: PrincipalPageComponent },
      { path: 'wish-list', component: PrincipalPageComponent },
      { path: 'create-movie', component: CreateMovieComponent },
      { path: 'description/:id', component: PrincipalPageComponent },
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
