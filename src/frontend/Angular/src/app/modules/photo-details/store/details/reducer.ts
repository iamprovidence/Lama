import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';
import { DataState, PhotoMenuItems, PhotoMenuState } from 'src/app/core/enums';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SetIsLoading:
      return { ...state, isLoading: action.payload };

    case ActionTypes.LoadPhoto:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadPhotoSucceed:
      return { ...state, photo: action.payload, isLoading: DataState.DisplayContent };
    case ActionTypes.LoadPhotoFailed:
      return { ...state, isLoading: DataState.Failed };
    case ActionTypes.ClearPhoto:
      return { ...state, photo: null, isLoading: DataState.NoContent };

    case ActionTypes.SelectMenuItem:
      return menuItemClicked(state, action.payload);

    case ActionTypes.UpdatePhotoSucceed:
      return { ...state, photo: action.payload, isLoading: DataState.DisplayContent };
    case ActionTypes.UpdatePhotoFailed:
      return { ...state, isLoading: DataState.Failed };

    default:
      return state;
  }
}

function menuItemClicked(state: State, photoMenuItem: PhotoMenuItems): State {
  let photoMenuState = state.photoMenuState;

  if (photoMenuItem === PhotoMenuItems.Edit) photoMenuState = PhotoMenuState.Edit;

  if (photoMenuItem === PhotoMenuItems.Cancel) photoMenuState = PhotoMenuState.Details;
  if (photoMenuItem === PhotoMenuItems.Save) photoMenuState = PhotoMenuState.Details;

  const currentMenuItem = doSwithFromEditToDetails(photoMenuState, state.photoMenuState)
    ? PhotoMenuItems.Comments
    : photoMenuItem;

  return { ...state, currentMenuItem, photoMenuState };
}

function doSwithFromEditToDetails(currentMenuState: PhotoMenuState, previousMenuState: PhotoMenuState): boolean {
  return currentMenuState === PhotoMenuState.Details && previousMenuState === PhotoMenuState.Edit;
}
