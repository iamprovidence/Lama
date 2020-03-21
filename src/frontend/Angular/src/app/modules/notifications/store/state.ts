import { State as RootState } from '@app/app.state';
import { DataState } from '@core/enums';
import { NotificationListDTO } from '@core/models';

export const SLICE_NAME = 'notifications';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isLoading: DataState;
  notifications: NotificationListDTO[];
}

export const InitialState: State = {
  isLoading: DataState.DisplayContent,
  notifications: []
};
