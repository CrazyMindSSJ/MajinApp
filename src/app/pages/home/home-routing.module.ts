import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'talleres',
    loadChildren: () => import('../talleres/talleres.module').then( m => m.TalleresPageModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('../pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'admin-region-comuna',
    loadChildren: () => import('../admin-region-comuna/admin-region-comuna.module').then( m => m.AdminRegionComunaPageModule)
  },
  {
    path: 'admin-usuarios',
    loadChildren: () => import('../admin-usuarios/admin-usuarios.module').then( m => m.AdminUsuariosPageModule)
  },
  {
    path: 'admin-talleres',
    loadChildren: () => import('../admin-talleres/admin-talleres.module').then( m => m.AdminTalleresPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
