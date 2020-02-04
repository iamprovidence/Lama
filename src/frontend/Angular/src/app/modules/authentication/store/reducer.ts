import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';

import { DataState } from 'src/app/core/enums';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SetIsSignInModalOpen:
      return {
        ...state,
        isSignInModalOpen: action.payload
      };

    case ActionTypes.LoadUser:
      return { ...state, isLoading: DataState.Loading };

    case ActionTypes.LoginSuccessed:
      return {
        ...state,
        error: null,
        user: action.payload,
        isLoading: DataState.DisplayContent
      };
    case ActionTypes.LoginFailed:
      return {
        ...state,
        error: action.payload,
        isLoading: DataState.Failed
      };
    case ActionTypes.Logout:
      return InitialState;

    default:
      return state;
  }
}
