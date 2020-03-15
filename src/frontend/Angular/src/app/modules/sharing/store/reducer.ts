import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';
import { DataState } from 'src/app/core/enums';
import { SharePhotoDTO, DeleteSharedPhotoDTO } from 'src/app/core/models';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadSharedEmails:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadSharedEmailsSucceed:
      return {
        ...state,
        sharedEmails: action.payload,
        isLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent
      };
    case ActionTypes.LoadSharedEmailsFailed:
      return { ...state, isLoading: DataState.Failed };

    case ActionTypes.ClearSharedEmails:
      return { ...state, sharedEmails: [], isLoading: DataState.DisplayContent, error: '' };

    case ActionTypes.SharePhotoSucceed:
      return sharePhotoSucceed(state, action.payload);
    case ActionTypes.SharePhotoFailed:
      return { ...state, error: action.payload };

    case ActionTypes.DeleteShared:
      return deleteSharedPhoto(state, action.payload);

    default:
      return state;
  }
}

function sharePhotoSucceed(state: State, sharePhoto: SharePhotoDTO): State {
  const sharedEmails = [sharePhoto, ...state.sharedEmails];
  const isLoading = sharedEmails.length === 0 ? DataState.NoContent : DataState.DisplayContent;
  return { ...state, sharedEmails, isLoading };
}

function deleteSharedPhoto(state: State, deleteShared: DeleteSharedPhotoDTO): State {
  const sharedEmails = state.sharedEmails.filter(se => se !== deleteShared);
  const isLoading = sharedEmails.length === 0 ? DataState.NoContent : DataState.DisplayContent;
  return { ...state, sharedEmails, isLoading };
}
