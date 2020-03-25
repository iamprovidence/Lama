import { AlbumListDTO, PhotoListDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';
import { State as RootState } from 'src/app/app.state';

export const SLICE_NAME = 'albums';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isCreateAlbumModalOpen: boolean;
  isEditAlbumModalOpen: boolean;
  isDeleteAlbumModalOpen: boolean;

  isLoading: DataState;
  albums: AlbumListDTO[];
  currentAlbumId: number | null;
  photos: PhotoListDTO[];
}

export const InitialState: State = {
  isCreateAlbumModalOpen: false,
  isEditAlbumModalOpen: false,
  isDeleteAlbumModalOpen: false,

  isLoading: DataState.DisplayContent,
  albums: [],
  photos: [],
  currentAlbumId: null
};
