import { Actions, ActionTypes } from './actions';
import { InitialState, State, SHOWN_SEARCH_HISTORY_AMOUNT } from './state';

import { DataState } from 'src/app/core/enums';
import { SearchHistoryListDTO } from 'src/app/core/models';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SetIsSearchHistoryOpen:
      return { ...state, isSearchHistoryOpen: action.payload };

    case ActionTypes.LoadSearchHistory:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadSearchHistorySucceed:
      return {
        ...state,
        isLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent,
        searchList: action.payload
      };
    case ActionTypes.LoadSearchHistoryFailed:
      return { ...state, isLoading: DataState.Failed };

    case ActionTypes.AddSearch:
      return addSearch(state, action.payload);

    default:
      return state;
  }
}

function addSearch(state: State, createdSearch: SearchHistoryListDTO): State {
  const searchList = [...state.searchList];

  const findedIndex = searchList.findIndex(s => s.text === createdSearch.text);
  if (findedIndex !== -1) searchList.splice(findedIndex, 1);
  else if (searchList.length >= SHOWN_SEARCH_HISTORY_AMOUNT) searchList.pop();

  searchList.unshift(createdSearch);

  return {
    ...state,
    isLoading: searchList.length === 0 ? DataState.NoContent : DataState.DisplayContent,
    searchList
  };
}
