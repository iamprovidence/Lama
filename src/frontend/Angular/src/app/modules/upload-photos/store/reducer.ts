import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.SetIsUploadPhotoModalOpen:
      return {
        ...state,
        isUploadPhotoModalOpen: action.payload
      };
    case ActionTypes.SetUploadedPhotos:
      return {
        ...state,
        uploadedPhotos: action.payload
      };
    case ActionTypes.RemoveUploadedPhoto: {
      const uploadedPhotos = state.uploadedPhotos.filter(photo => photo.name !== action.payload);

      return { ...state, uploadedPhotos };
    }

    case ActionTypes.UpdatePhoto: {
      const photoToUpdateIndex = state.uploadedPhotos.findIndex(photo => photo.name === action.payload.name);

      const photoToUpdate = state.uploadedPhotos[photoToUpdateIndex];
      const updatedPhoto = { ...photoToUpdate, ...action.payload };

      const uploadedPhotos = [
        ...state.uploadedPhotos.slice(0, photoToUpdateIndex),
        updatedPhoto,
        ...state.uploadedPhotos.slice(photoToUpdateIndex + 1)
      ];

      return { ...state, uploadedPhotos };
    }

    case ActionTypes.ClearUploadedPhotos: {
      return {
        ...state,
        isUploadPhotoModalOpen: false,
        uploadedPhotos: []
      };
    }

    default:
      return state;
  }
}
