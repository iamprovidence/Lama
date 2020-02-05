import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';
import { DataState } from 'src/app/core/enums';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadPhoto:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadPhotoSucceed:
      return { ...state, photo: action.payload, isLoading: DataState.DisplayContent };
    case ActionTypes.LoadPhotoFailed:
      return { ...state, isLoading: DataState.Failed };
    case ActionTypes.ClearPhoto:
      return { ...state, photo: null, isLoading: DataState.NoContent };
    default:
      return state;
  }
}
