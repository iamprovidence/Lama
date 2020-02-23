import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, SLICE_NAME } from './state';

const getState = createFeatureSelector<State>(SLICE_NAME);

export const getIsSearchHistoryOpen = createSelector(getState, state => state.isSearchHistoryOpen);

export const getIsLoading = createSelector(getState, state => state.isLoading);

export const getSearchHistory = createSelector(getState, state => state.searchList);
