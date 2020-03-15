import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './containers/search/search.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';

import { PhotosType } from '@core/enums';
import { PhotosData } from '@core/routes-data';

const routes: Routes = [
  {
    path: '',
    loadChildren: 'src/app/modules/photos/photos.module#PhotosModule',
    data: {
      photosType: PhotosType.Search
    } as PhotosData
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [SearchComponent, SearchInputComponent, SearchHistoryComponent];
}
