import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './components/base/base.component';

const routes: Routes = [
  {
    path: '', component: BaseComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('../principal-page/principal-page.module').then(m => m.PrincipalPageModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class LayoutRoutingModule { }
