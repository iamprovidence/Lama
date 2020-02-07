import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, SLICE_NAME } from './state';

const getState = createFeatureSelector<State>(SLICE_NAME);

export const getIsLoading = createSelector(getState, state => state.isLoading);
export const getPhoto = createSelector(getState, state => state.photo);
