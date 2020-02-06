import { FirebaseUser } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';
import { State as RootState } from 'src/app/app.state';

export const SLICE_NAME = 'authentication';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isSignInModalOpen: boolean;
  isLoading: DataState;
  user: FirebaseUser;
  error: string;
}

export const InitialState: State = {
  isSignInModalOpen: false,
  isLoading: DataState.Loading,
  user: null,
  error: null
};
