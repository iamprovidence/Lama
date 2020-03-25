import { Action } from '@ngrx/store';
import { SearchHistoryListDTO } from 'src/app/core/models';

export enum ActionTypes {
  SetIsSearchHistoryOpen = '[PHOTOS-SEARCH] SetIsSearchHistoryOpen',

  LoadSearchHistory = '[PHOTOS-SEARCH] LoadSearchHistory',
  LoadSearchHistorySucceed = '[PHOTOS-SEARCH] LoadSearchHistorySucceed',
  LoadSearchHistoryFailed = '[PHOTOS-SEARCH] LoadSearchHistoryFailed',

  AddSearch = '[PHOTOS-SEARCH] AddSearch'
}

export class SetIsSearchHistoryOpen implements Action {
  readonly type = ActionTypes.SetIsSearchHistoryOpen;
  constructor(public payload: boolean) {}
}

export class LoadSearchHistory implements Action {
  readonly type = ActionTypes.LoadSearchHistory;
  constructor(public payload: number) {}
}

export class LoadSearchHistorySucceed implements Action {
  readonly type = ActionTypes.LoadSearchHistorySucceed;
  constructor(public payload: SearchHistoryListDTO[]) {}
}

export class LoadSearchHistoryFailed implements Action {
  readonly type = ActionTypes.LoadSearchHistoryFailed;
  constructor(public payload: string) {}
}

export class AddSearch implements Action {
  readonly type = ActionTypes.AddSearch;
  constructor(public payload: SearchHistoryListDTO) {}
}

export type Actions =
  | SetIsSearchHistoryOpen
  | LoadSearchHistory
  | LoadSearchHistorySucceed
  | LoadSearchHistoryFailed
  | AddSearch;
