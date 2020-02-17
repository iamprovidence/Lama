import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, SLICE_NAME } from './state';

const getState = createFeatureSelector<State>(SLICE_NAME);

export const getIsLoading = createSelector(getState, state => state.isLoading);

export const getCurrentAlbumId = createSelector(getState, state => state.currentAlbumId);

export const getAlbums = createSelector(getState, state => state.albums);

export const getCurrentAlbum = createSelector([getAlbums, getCurrentAlbumId], (albums, currentAlbumId) =>
  albums.find(a => a.id === currentAlbumId)
);

export const getCopyOfCurrentAlbum = createSelector([getAlbums, getCurrentAlbumId], (albums, currentAlbumId) => {
  if (!currentAlbumId) return null;
  const album = albums.find(a => a.id === currentAlbumId);
  return { ...album };
});

export const getIsCreateAlbumModalOpen = createSelector(getState, state => state.isCreateAlbumModalOpen);

export const getIsEditAlbumModalOpen = createSelector(getState, state => state.isEditAlbumModalOpen);

export const getIsDeleteAlbumModalOpen = createSelector(getState, state => state.isDeleteAlbumModalOpen);
