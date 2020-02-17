import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, SLICE_NAME } from './state';

const getState = createFeatureSelector<State>(SLICE_NAME);

export const getIsAddPhotoToAlbumModalActive = createSelector(getState, state => state.isAddPhotoToAlbumModalActive);

export const getIsPhotosLoading = createSelector(getState, state => state.isPhotosLoading);
export const getPhotos = createSelector(getState, state => state.photos);

export const getIsAlbumPhotosLoading = createSelector(getState, state => state.isAlbumPhotosLoading);
export const getAlbumPhotos = createSelector(getState, state => state.albumPhotos);

export const getCurrentAlbumPhotos = createSelector([getPhotos, getAlbumPhotos], (photos, albumPhotos) => {
  const set = new Set(albumPhotos.map(ap => ap.photoId));

  return photos.filter(p => set.has(p.id));
});

export const getSelectedPhotos = createSelector(getState, state => state.selected);

export const getSelectedUpdateAlbumPhotos = createSelector(getState, state => state.selectedUpdateAlbumPhotos);
