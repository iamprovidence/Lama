import { State as RootState } from 'src/app/app.state';
export const SLICE_NAME = 'photo-details';

import { SLICE_NAME as DETAILS_SLICE_NAME } from './details/state';
import { State as DetailsState } from './details/state';

import { SLICE_NAME as EDIT_SLICE_NAME } from './edit/state';
import { State as EditState } from './edit/state';

export interface AppState extends RootState {
  [SLICE_NAME]: PhotoState;
}

export interface PhotoState {
  [DETAILS_SLICE_NAME]: DetailsState;
  [EDIT_SLICE_NAME]: EditState;
}
