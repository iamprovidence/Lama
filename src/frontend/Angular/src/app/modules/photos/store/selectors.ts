import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, SLICE_NAME } from './state';

const getState = createFeatureSelector<State>(SLICE_NAME);

export const getViewType = createSelector(getState, state => state.viewType);
export const getPhotos = createSelector(getState, state => state.photos);
