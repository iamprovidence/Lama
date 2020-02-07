import { State as RootState } from 'src/app/app.state';
import { DataState } from 'src/app/core/enums';
import { CommentListDTO } from 'src/app/core/models';

export const SLICE_NAME = 'comments';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isLoading: DataState;
  comments: CommentListDTO[];
}

export const InitialState: State = {
  isLoading: DataState.DisplayContent,
  comments: []
};
