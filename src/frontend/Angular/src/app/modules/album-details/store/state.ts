import { PhotoListDTO, PhotoAlbumDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';
import { State as RootState } from 'src/app/app.state';

export const SLICE_NAME = 'album-details';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isAddPhotoToAlbumModalActive: boolean;

  isPhotosLoading: DataState;
  photos: PhotoListDTO[];

  isAlbumPhotosLoading: DataState;
  albumPhotos: PhotoAlbumDTO[];

  selected: Set<string>;
  selectedUpdateAlbumPhotos: Set<string>;
}

export const InitialState: State = {
  isAddPhotoToAlbumModalActive: false,

  isPhotosLoading: DataState.DisplayContent,
  photos: [],

  isAlbumPhotosLoading: DataState.DisplayContent,
  albumPhotos: [],

  selected: new Set<string>(),
  selectedUpdateAlbumPhotos: new Set<string>()
};
