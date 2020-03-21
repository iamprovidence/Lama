import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, SLICE_NAME } from './state';

const getState = createFeatureSelector<State>(SLICE_NAME);

export const getIsLoading = createSelector(getState, state => state.isLoading);

export const getNotifications = createSelector(getState, state => state.notifications);

export const getNotificationsAmount = createSelector(getState, state => state.notifications.length);
