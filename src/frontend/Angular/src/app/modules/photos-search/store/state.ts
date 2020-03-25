import { SearchHistoryListDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';
import { State as RootState } from 'src/app/app.state';

export const SLICE_NAME = 'photos-search';
export const SHOWN_SEARCH_HISTORY_AMOUNT = 6;

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isSearchHistoryOpen: boolean;
  isLoading: DataState;
  searchList: SearchHistoryListDTO[];
}

export const InitialState: State = {
  isSearchHistoryOpen: false,
  isLoading: DataState.DisplayContent,
  searchList: []
};
