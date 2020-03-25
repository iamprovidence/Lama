import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SLICE_NAME as ROOT_SLICE, PhotoState } from '../index';
import { State, SLICE_NAME } from './state';

const getRootState = createFeatureSelector<PhotoState>(ROOT_SLICE);

const getState = createSelector(getRootState, state => state[SLICE_NAME] as State);

export const getIsLoading = createSelector(getState, state => state.isLoading);

export const getPhoto = createSelector(getState, state => state.photo);

export const getCurrentPhotoId = createSelector(getState, state => state.photo.id);

export const getPhotoMenuState = createSelector(getState, state => state.photoMenuState);

export const getCurrentMenuItem = createSelector(getState, state => state.currentMenuItem);
