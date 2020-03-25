import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectAuthorizedToPhotos = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLanding = () => redirectUnauthorizedTo(['landing']);

const routes: Routes = [
  {
    path: 'landing',
    loadChildren: 'src/app/modules/landing/landing.module#LandingModule',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectAuthorizedToPhotos }
  },
  {
    path: '',
    loadChildren: 'src/app/modules/main/main.module#MainModule',
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLanding }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {}
