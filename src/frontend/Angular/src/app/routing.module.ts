import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsAnonymousGuard, IsAuthorizedGuard } from 'src/app/modules/authentication/guards';

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: 'src/app/modules/landing/landing.module#LandingModule',
    canActivate: [IsAnonymousGuard]
  },
  {
    path: '',
    loadChildren: 'src/app/modules/main/main.module#MainModule',
    canActivate: [IsAuthorizedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
