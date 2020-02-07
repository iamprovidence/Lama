import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, SLICE_NAME } from './state';

const getState = createFeatureSelector<State>(SLICE_NAME);

export const getIsSignInModalOpen = createSelector(getState, state => state.isSignInModalOpen);

export const getUser = createSelector(getState, state => state.user);

export const getIsLoading = createSelector(getState, state => state.isLoading);

export const getIsAuthorized = createSelector(getState, state => !!state.user);

export const getError = createSelector(getState, state => state.error);
