import { DeletedPhotosListDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';
import { State as RootState } from 'src/app/app.state';

export const SLICE_NAME = 'deleted-photos';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isLoading: DataState;
  error: string;
  deletedPhotos: DeletedPhotosListDTO[];
  selected: Set<string>;
}

export const InitialState: State = {
  isLoading: DataState.DisplayContent,
  error: '',
  deletedPhotos: [],
  selected: new Set<string>()
};
