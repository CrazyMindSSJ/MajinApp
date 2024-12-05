import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminTalleresPage } from './admin-talleres.page';

const routes: Routes = [
  {
    path: '',
    component: AdminTalleresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTalleresPageRoutingModule {}
