import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SetViewType:
      return {
        ...state,
        viewType: action.payload
      };

    case ActionTypes.LoadPhotos:
      return state;
    case ActionTypes.LoadPhotosSucceed:
      return {
        ...state,
        photos: action.payload
      };
    case ActionTypes.ClearPhotos: {
      return { ...state, photos: [] };
    }
    case ActionTypes.AddPhotos: {
      const photos = [...action.payload.reverse(), ...state.photos];
      return { ...state, photos };
    }
    default:
      return state;
  }
}
