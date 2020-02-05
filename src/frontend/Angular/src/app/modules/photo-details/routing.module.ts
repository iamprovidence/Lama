import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoDetailsComponent } from './containers/photo-details/photo-details.component';
import { PhotoDetailsModalComponent } from './components/photo-details-modal/photo-details-modal.component';

const routes: Routes = [
  {
    path: '',
    component: PhotoDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [PhotoDetailsComponent, PhotoDetailsModalComponent];
}
