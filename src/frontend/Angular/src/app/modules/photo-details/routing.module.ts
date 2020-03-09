import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO: sort this
import { EditPanelComponent } from './containers/menu-details-panel/edit-panel/edit-panel.component';
import { PhotoDetailsComponent } from './containers/photo-details/photo-details.component';
import { MenuDetailsPanelComponent } from './containers/menu-details-panel/menu-details-panel.component';
import { PhotoDetailsModalComponent } from './components/photo-details-modal/photo-details-modal.component';
import { PhotoInfoComponent } from './containers/menu-details-panel/photo-info/photo-info.component';
import { PhotoInfoViewComponent } from './components/menu-details-panel-view/photo-info-view/photo-info-view.component';
import { PhotoDetailsPanelComponent } from './containers/photo-details-panel/photo-details-panel.component';
import { PhotoDetailsPanelViewComponent } from './components/photo-details-panel-view/photo-details-panel-view.component';

import { PhotoTopBarMenuComponent } from './containers/photo-top-bar-menu/photo-top-bar-menu.component';
import { PhotoTopBarMenuViewComponent } from './components/photo-top-bar-menu-view/photo-top-bar-menu-view.component';

import { EditPhotoTabsComponent } from './components/menu-details-panel-view/edit-photo-tabs/edit-photo-tabs.component';
import { AdjustTabComponent } from './components/menu-details-panel-view/edit-photo-tabs/tabs/adjust-tab/adjust-tab.component';
import { CropTabComponent } from './components/menu-details-panel-view/edit-photo-tabs/tabs/crop-tab/crop-tab.component';
import { FiltersTabComponent } from './components/menu-details-panel-view/edit-photo-tabs/tabs/filters-tab/filters-tab.component';
import { RotateTabComponent } from './components/menu-details-panel-view/edit-photo-tabs/tabs/rotate-tab/rotate-tab.component';

import { MenuDetailsPanelViewComponent } from './components/menu-details-panel-view/menu-details-panel-view.component';

const photoDetails = [
  EditPanelComponent,
  PhotoDetailsComponent,
  PhotoInfoComponent,
  PhotoDetailsModalComponent,
  PhotoInfoViewComponent,
  MenuDetailsPanelComponent,
  PhotoDetailsPanelComponent,
  PhotoDetailsPanelViewComponent,
  MenuDetailsPanelViewComponent
];
const photoMenu = [PhotoTopBarMenuComponent, PhotoTopBarMenuViewComponent];

const photoEditing = [EditPhotoTabsComponent];
const editingTabs = [AdjustTabComponent, CropTabComponent, FiltersTabComponent, RotateTabComponent];

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
  static components = [photoDetails, photoMenu, photoEditing, editingTabs];
}
