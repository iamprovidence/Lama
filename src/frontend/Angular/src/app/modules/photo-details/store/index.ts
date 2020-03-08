import { State as RootState } from 'src/app/app.state';
export const SLICE_NAME = 'photo-details';

export interface AppState extends RootState {
  [SLICE_NAME]: PhotoState;
}

export interface PhotoState {}
