import { Actions, ActionTypes, SelectAlbumPhoto } from './actions';
import { InitialState, State } from './state';
import { DataState } from 'src/app/core/enums';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadAlbumPhotos:
      return { ...state, isAlbumPhotosLoading: DataState.Loading };

    case ActionTypes.LoadAlbumPhotosSucceed:
      return {
        ...state,
        albumPhotos: action.payload,
        isAlbumPhotosLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent,
        selectedUpdateAlbumPhotos: new Set<string>(action.payload.map(p => p.photoId))
      };

    case ActionTypes.LoadAlbumPhotosFailed:
      return {
        ...state,
        isAlbumPhotosLoading: DataState.Failed
      };

    case ActionTypes.ClearAlbumPhotos:
      return { ...state, isAlbumPhotosLoading: DataState.DisplayContent };

    case ActionTypes.LoadPhotos:
      return { ...state, isPhotosLoading: DataState.Loading };
    case ActionTypes.LoadPhotosSucceed:
      return {
        ...state,
        isPhotosLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent,
        photos: action.payload
      };
    case ActionTypes.LoadPhotosFailed:
      return {
        ...state,
        isPhotosLoading: DataState.Failed
      };
    case ActionTypes.ClearPhotos: {
      return { ...state, photos: [], isPhotosLoading: DataState.DisplayContent };
    }

    case ActionTypes.SetIsAddPhotosToModalOpen:
      return {
        ...state,
        isAddPhotoToAlbumModalActive: action.payload
      };

    case ActionTypes.SelectPhoto:
      return selectPhoto(state, action.payload);
    case ActionTypes.SelectAlbumPhoto:
      return selectAlbumPhoto(state, action.payload);
    case ActionTypes.DeleteSelectedPhotosSucceed:
      return deletePhotosFromAlbum(state);

    default:
      return state;
  }
}

function selectPhoto(state: State, photoId: string): State {
  const selectedPhotos = new Set(state.selected);

  if (selectedPhotos.has(photoId)) selectedPhotos.delete(photoId);
  else selectedPhotos.add(photoId);

  return {
    ...state,
    selected: selectedPhotos
  };
}

function selectAlbumPhoto(state: State, photoId: string): State {
  const selectedPhotos = new Set(state.selectedUpdateAlbumPhotos);

  if (selectedPhotos.has(photoId)) selectedPhotos.delete(photoId);
  else selectedPhotos.add(photoId);

  return {
    ...state,
    selectedUpdateAlbumPhotos: selectedPhotos
  };
}

function deletePhotosFromAlbum(state: State): State {
  const { albumPhotos: oldPhotos, selected, selectedUpdateAlbumPhotos: oldSelectedUpdateAlbumPhotos } = state;
  const albumPhotos = oldPhotos.filter(p => !selected.has(p.photoId));

  const selectedUpdateAlbumPhotos = new Set<string>(
    [...oldSelectedUpdateAlbumPhotos].filter(photoId => !selected.has(photoId))
  );

  return {
    ...state,
    selected: new Set<string>(),
    selectedUpdateAlbumPhotos,
    albumPhotos,
    isAlbumPhotosLoading: albumPhotos.length === 0 ? DataState.NoContent : DataState.DisplayContent
  };
}
