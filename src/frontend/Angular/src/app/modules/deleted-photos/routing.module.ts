import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletedPhotosComponent } from './containers/deleted-photos/deleted-photos.component';
import { DeletedPhotosButtonsComponent } from './components/deleted-photos-buttons/deleted-photos-buttons.component';
import { DeletedPhotosGridComponent } from './components/deleted-photos-grid/deleted-photos-grid.component';

const routes: Routes = [
  {
    path: '',
    component: DeletedPhotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [DeletedPhotosComponent, DeletedPhotosButtonsComponent, DeletedPhotosGridComponent];
}
