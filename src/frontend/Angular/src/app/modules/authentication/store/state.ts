import { FirebaseUser } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

export const SLICE_NAME = 'authentication';

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
