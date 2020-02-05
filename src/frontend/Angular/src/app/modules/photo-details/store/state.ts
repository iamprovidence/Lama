import { State as RootState } from 'src/app/app.state';
import { PhotoViewDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

export const SLICE_NAME = 'photo-details';

export interface AppState extends RootState {
  ['photo-details']: State;
}

export interface State {
  isLoading: DataState;
  photo: PhotoViewDTO;
}

export const InitialState: State = {
  isLoading: DataState.DisplayContent,
  photo: null
};
