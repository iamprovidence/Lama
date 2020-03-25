import { DataState } from 'src/app/core/enums';
import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadPhotos:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadPhotosSucceed:
      return {
        ...state,
        error: null,
        isLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent,
        deletedPhotos: action.payload
      };
    case ActionTypes.LoadPhotosFailed:
      return {
        ...state,
        error: action.payload,
        isLoading: DataState.Failed
      };
    case ActionTypes.ClearPhotos:
      return { ...InitialState, selected: state.selected };

    case ActionTypes.SelectPhoto:
      return selectPhoto(state, action.payload);

    case ActionTypes.RestoreDeleteSelectedPhotosSucceed:
      return restoreDeleteSucceed(state);

    case ActionTypes.RestoreDeleteSelectedPhotosFailed:
      return { ...state, selected: new Set<string>() };

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

function restoreDeleteSucceed(state: State): State {
  const deletedPhotos = state.deletedPhotos.filter(p => !state.selected.has(p.id));

  const selected = new Set<string>();

  return {
    ...state,
    deletedPhotos,
    selected,
    isLoading: deletedPhotos.length === 0 ? DataState.NoContent : DataState.DisplayContent
  };
}
