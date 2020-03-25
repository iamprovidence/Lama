import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';
import { DataState } from 'src/app/core/enums';
import { PhotoThumbnailDTO } from '@app/core/models';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SetViewType:
      return {
        ...state,
        viewType: action.payload
      };

    case ActionTypes.LoadPhotos:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadPhotosSucceed:
      return {
        ...state,
        isLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent,
        photos: action.payload
      };
    case ActionTypes.LoadPhotosFailed:
      return {
        ...state,
        isLoading: DataState.Failed
      };
    case ActionTypes.ClearPhotos: {
      return { ...state, photos: [], isLoading: DataState.DisplayContent };
    }
    case ActionTypes.AddPhotos: {
      const photos = [...action.payload.reverse(), ...state.photos];
      return {
        ...state,
        photos,
        isLoading: photos.length === 0 ? DataState.NoContent : DataState.DisplayContent
      };
    }

    case ActionTypes.SelectPhoto:
      return selectPhoto(state, action.payload);
    case ActionTypes.DeleteSelectedPhotosSucceed:
      return deletePhotos(state);

    case ActionTypes.UpdateThumbnails:
      return updateThumbnails(state, action.payload);

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

function deletePhotos(state: State): State {
  const { photos: oldPhotos, selected } = state;
  const photos = oldPhotos.filter(p => !selected.has(p.id));

  return {
    ...state,
    selected: new Set<string>(),
    photos,
    isLoading: photos.length === 0 ? DataState.NoContent : DataState.DisplayContent
  };
}

function updateThumbnails(state: State, thumbnails: PhotoThumbnailDTO[]): State {
  const thumbnailsMap = new Map(thumbnails.map(t => [t.photoId, t]));
  const photos = state.photos.map(p => (thumbnailsMap.has(p.id) ? { ...p, ...thumbnailsMap.get(p.id) } : p));

  return { ...state, photos };
}
