import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoDetailsComponent } from './containers/photo-details/photo-details.component';
import { PhotoDetailsModalComponent } from './components/photo-details-modal/photo-details-modal.component';

import { PhotoDetailsPanelComponent } from './containers/photo-details-panel/photo-details-panel.component';
import { PhotoDetailsPanelViewComponent } from './components/photo-details-panel-view/photo-details-panel-view.component';

import { PhotoTopBarMenuComponent } from './containers/photo-top-bar-menu/photo-top-bar-menu.component';
import { PhotoTopBarMenuViewComponent } from './components/photo-top-bar-menu-view/photo-top-bar-menu-view.component';

import { MenuDetailsPanelComponent } from './containers/menu-details-panel/menu-details-panel.component';
import { MenuDetailsPanelViewComponent } from './components/menu-details-panel-view/menu-details-panel-view.component';

import { PhotoInfoComponent } from './containers/menu-details-panel/photo-info/photo-info.component';
import { PhotoInfoViewComponent } from './components/menu-details-panel-view/photo-info-view/photo-info-view.component';

import { EditPanelComponent } from './containers/menu-details-panel/edit-panel/edit-panel.component';
import { EditPhotoTabsComponent } from './components/menu-details-panel-view/edit-photo-tabs/edit-photo-tabs.component';
import { AdjustTabComponent } from './components/menu-details-panel-view/edit-photo-tabs/tabs/adjust-tab/adjust-tab.component';
import { CropTabComponent } from './components/menu-details-panel-view/edit-photo-tabs/tabs/crop-tab/crop-tab.component';
import { FiltersTabComponent } from './components/menu-details-panel-view/edit-photo-tabs/tabs/filters-tab/filters-tab.component';
import { RotateTabComponent } from './components/menu-details-panel-view/edit-photo-tabs/tabs/rotate-tab/rotate-tab.component';

const photoDetails = [PhotoDetailsComponent, PhotoDetailsModalComponent];

const photoPanel = [PhotoDetailsPanelComponent, PhotoDetailsPanelViewComponent];
const topBarMenu = [PhotoTopBarMenuComponent, PhotoTopBarMenuViewComponent];

const photoInfoPanel = [PhotoInfoComponent, PhotoInfoViewComponent];
const editPhotoPanel = [
  EditPanelComponent,
  EditPhotoTabsComponent,
  AdjustTabComponent,
  CropTabComponent,
  FiltersTabComponent,
  RotateTabComponent
];
const rightMenuPanel = [MenuDetailsPanelComponent, MenuDetailsPanelViewComponent, ...photoInfoPanel, ...editPhotoPanel];

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
  static components = [photoDetails, photoPanel, rightMenuPanel, topBarMenu];
}
