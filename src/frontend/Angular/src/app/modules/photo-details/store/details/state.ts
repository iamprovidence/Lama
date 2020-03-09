import { PhotoState } from '../index';
import { PhotoViewDTO } from 'src/app/core/models';
import { DataState, PhotoMenuState, PhotoMenuItems } from 'src/app/core/enums';

export const SLICE_NAME = 'details';

export interface AppState extends PhotoState {
  [SLICE_NAME]: State;
}

export interface State {
  isLoading: DataState;
  photo: PhotoViewDTO;

  photoMenuState: PhotoMenuState;
  currentMenuItem: PhotoMenuItems;
}

export const InitialState: State = {
  isLoading: DataState.DisplayContent,
  photo: null,

  photoMenuState: PhotoMenuState.Details,
  currentMenuItem: PhotoMenuItems.Comments
};
