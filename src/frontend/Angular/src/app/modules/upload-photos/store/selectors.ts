import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, SLICE_NAME } from './state';

const getState = createFeatureSelector<State>(SLICE_NAME);

export const getIsUploadPhotoModalOpen = createSelector(getState, state => state.isUploadPhotoModalOpen);
export const getUploadedPhotos = createSelector(getState, state => state.uploadedPhotos);
