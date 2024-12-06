import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TalleresPage } from './talleres.page';

const routes: Routes = [
  {
    path: '',
    component: TalleresPage
  },
  {
    path: 'taller:id',
    loadChildren: () => import('../taller/taller.module').then( m => m.TallerPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TalleresPageRoutingModule {}
