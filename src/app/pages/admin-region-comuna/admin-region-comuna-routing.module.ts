import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminRegionComunaPage } from './admin-region-comuna.page';

const routes: Routes = [
  {
    path: '',
    component: AdminRegionComunaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRegionComunaPageRoutingModule {}
