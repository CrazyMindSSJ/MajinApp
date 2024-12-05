import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'talleres',
    loadChildren: () => import('./pages/talleres/talleres.module').then( m => m.TalleresPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'registro-taller',
    loadChildren: () => import('./pages/registro-taller/registro-taller.module').then( m => m.RegistroTallerPageModule)
  },
  {
    path: 'admin-usuarios',
    loadChildren: () => import('./pages/admin-usuarios/admin-usuarios.module').then( m => m.AdminUsuariosPageModule)
  },
  {
    path: 'admin-talleres',
    loadChildren: () => import('./pages/admin-talleres/admin-talleres.module').then( m => m.AdminTalleresPageModule)
  },
  {
    path: 'taller',
    loadChildren: () => import('./pages/taller/taller.module').then( m => m.TallerPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pages/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'pagos',
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'admin-region-comuna',
    loadChildren: () => import('./pages/admin-region-comuna/admin-region-comuna.module').then( m => m.AdminRegionComunaPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
