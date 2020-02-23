import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './containers/search/search.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SearchHistoryComponent } from './components/search-history/search-history.component';

const routes: Routes = [
  {
    path: '',
    component: null
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
  static components = [SearchComponent, SearchInputComponent, SearchHistoryComponent];
}
