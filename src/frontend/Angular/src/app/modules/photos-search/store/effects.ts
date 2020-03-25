import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { PhotosSearchService as ApiService } from '../photos-search.service';
import * as SearchActions from '../store/actions';
import * as PhotosActions from '../../photos/store/actions';

import { AddSearchDTO, SearchHistoryListDTO } from 'src/app/core/models';

@Injectable()
export class SearchEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadSearchHistory$: Observable<Action> = this.actions$.pipe(
    ofType(SearchActions.ActionTypes.LoadSearchHistory),
    map((action: SearchActions.LoadSearchHistory) => action.payload),
    mergeMap(amount =>
      this.apiService.getCurrentUserSearch(amount).pipe(
        map(photos => new SearchActions.LoadSearchHistorySucceed(photos)),
        catchError(err => of(new SearchActions.LoadSearchHistoryFailed(err)))
      )
    )
  );

  @Effect()
  searchPhotos$: Observable<Action> = this.actions$.pipe(
    ofType(PhotosActions.ActionTypes.SearchPhotos),
    map((action: PhotosActions.SearchPhotos) => action.payload),
    mergeMap(searchInput =>
      this.apiService
        .saveSearch({ text: searchInput } as AddSearchDTO)
        .pipe(map(searchResult => new SearchActions.AddSearch(searchResult)))
    )
  );
}
