import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { State } from 'src/app/app.state';
import { SHOWN_SEARCH_HISTORY_AMOUNT } from '../../store/state';
import * as fromSearchHistory from '../../store/selectors';
import * as SearchActions from '../../store/actions';
import * as PhotoActions from 'src/app/modules/photos/store/actions';

import { DataState } from 'src/app/core/enums';
import { SearchHistoryListDTO } from 'src/app/core/models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
  public isLoading$: Observable<DataState>;
  public searchHistory$: Observable<SearchHistoryListDTO[]>;
  public isSearchHistoryShown$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromSearchHistory.getIsLoading);
    this.searchHistory$ = this.store.select(fromSearchHistory.getSearchHistory);
    this.isSearchHistoryShown$ = this.store.select(fromSearchHistory.getIsSearchHistoryOpen);

    this.store.dispatch(new SearchActions.LoadSearchHistory(SHOWN_SEARCH_HISTORY_AMOUNT));
  }

  public openSearchHistory(isInputFocused: boolean): void {
    this.store.dispatch(new SearchActions.SetIsSearchHistoryOpen(isInputFocused));
  }

  public search(searchInput: string): void {
    this.store.dispatch(new PhotoActions.SearchPhotos(searchInput.trim()));
  }
}
