import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SLICE_NAME as ROOT_SLICE } from '../index';
import { State, SLICE_NAME } from './state';

const getRootState = createFeatureSelector(ROOT_SLICE);

const getState = createSelector(getRootState, state => state[SLICE_NAME] as State);

export const getCurrentEditPhotoTab = createSelector(getState, state => state.currentEditTab);

export const getCurrentImageBase64 = createSelector(getState, state => state.currentImageBase64);
export const getDisplayedlImageBase64 = createSelector(getState, state => state.displayedImageBase64);

export const getImageWidth = createSelector(getState, state => state.imageWidth);

export const getImageHeight = createSelector(getState, state => state.imageHeight);

export const getAllFilters = createSelector(getState, state => state.filters);
export const getCurrentFilter = createSelector(getState, state => state.filters[state.selectedFilterIndex]);

export const getFiltersThumbnails = createSelector(getState, state => state.filtersThumbnails);

export const getColorAdjustments = createSelector(getState, state => state.colorAdjustments);
