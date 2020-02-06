import { PhotoListDTO } from 'src/app/core/models';
import { PhotoViewType, DataState } from 'src/app/core/enums';
import { State as RootState } from 'src/app/app.state';

export const SLICE_NAME = 'photos';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  viewType: PhotoViewType;
  isLoading: DataState;
  photos: PhotoListDTO[];
  selected: Set<string>;
}

export const InitialState: State = {
  viewType: PhotoViewType.Cards,
  isLoading: DataState.DisplayContent,
  photos: [],
  selected: new Set<string>()
};
