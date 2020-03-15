import { State as RootState } from 'src/app/app.state';
import { SharedEmailsListDTO } from 'src/app/core/models';
import { DataState } from 'src/app/core/enums';

export const SLICE_NAME = 'sharing';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isLoading: DataState;
  sharedEmails: SharedEmailsListDTO[];
  error: string;
}

export const InitialState: State = {
  isLoading: DataState.DisplayContent,
  sharedEmails: [],
  error: ''
};
