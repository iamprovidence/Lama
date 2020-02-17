import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';

import { DataState } from 'src/app/core/enums';
import { AlbumListDTO } from 'src/app/core/models';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SetCurrentAlbumId:
      return { ...state, currentAlbumId: action.payload };
    case ActionTypes.LoadAlbums:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadAlbumsSucceed:
      return {
        ...state,
        isLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent,
        albums: action.payload
      };
    case ActionTypes.LoadAlbumsFailed:
      return {
        ...state,
        isLoading: DataState.Failed
      };
    case ActionTypes.ClearAlbums:
      return InitialState;

    case ActionTypes.SetIsCreateAlbumModalOpen:
      return {
        ...state,
        isCreateAlbumModalOpen: action.payload
      };
    case ActionTypes.CreateAlbumSucceed:
      return addAlbum(state, action.payload);

    case ActionTypes.SetIsEditAlbumModalOpen:
      return {
        ...state,
        isEditAlbumModalOpen: action.payload
      };

    case ActionTypes.EditAlbumSucceed:
      return editAlbum(state, action.payload);

    case ActionTypes.SetIsDeleteAlbumModalOpen:
      return { ...state, isDeleteAlbumModalOpen: action.payload };

    case ActionTypes.DeleteAlbumSucceed:
      return deleteAlbum(state, action.payload);

    default:
      return state;
  }
}

function addAlbum(state: State, createdAlbum: AlbumListDTO): State {
  const albums = [createdAlbum, ...state.albums];

  return {
    ...state,
    isLoading: albums.length === 0 ? DataState.NoContent : DataState.DisplayContent,
    albums
  };
}

function editAlbum(state: State, editedAlbum: AlbumListDTO): State {
  const albums = state.albums.map(a => (a.id === editedAlbum.id ? editedAlbum : a));

  return {
    ...state,
    isLoading: albums.length === 0 ? DataState.NoContent : DataState.DisplayContent,
    albums
  };
}

function deleteAlbum(state: State, albumId: number): State {
  const albums = state.albums.filter(a => a.id !== albumId);

  return {
    ...state,
    isLoading: albums.length === 0 ? DataState.NoContent : DataState.DisplayContent,
    albums
  };
}
