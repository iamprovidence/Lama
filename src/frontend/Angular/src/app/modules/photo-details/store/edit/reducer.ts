import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';
import { EditTab } from 'src/app/core/enums';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.ResetEditingChanges:
      return resetEditingValues(state);
    case ActionTypes.RestoreOriginal:
      return resetEditingValues(state);
    case ActionTypes.SaveChangesSucceed:
      return resetEditingValues(state);

    case ActionTypes.SelectEditPhotoTab:
      return { ...state, currentEditTab: action.payload };

    case ActionTypes.SetCroppedImage:
      return {
        ...state,
        currentImageBase64: action.payload.imageBase64,
        displayedImageBase64: action.payload.imageBase64
      };

    case ActionTypes.SetRotatedImage:
      return {
        ...state,
        currentImageBase64: action.payload.imageBase64,
        displayedImageBase64: action.payload.imageBase64
      };

    case ActionTypes.SetCroppedSizes:
      return { ...state, imageHeight: action.payload.height, imageWidth: action.payload.width };

    case ActionTypes.SetImageBase64:
      return { ...state, displayedImageBase64: action.payload, currentImageBase64: action.payload };

    case ActionTypes.LoadFiltersThumbnailsSucceed:
      return { ...state, filtersThumbnails: action.payload };

    case ActionTypes.ApplyFilter:
      return { ...state, selectedFilterIndex: action.payload };

    case ActionTypes.SetColorAdjustments:
      return { ...state, colorAdjustments: action.payload };

    case ActionTypes.EditImageSucceed:
      return { ...state, displayedImageBase64: action.payload };

    default:
      return state;
  }
}

function resetEditingValues(state: State): State {
  const currentEditTab = EditTab.Crop;
  const selectedFilterIndex = 0;
  const colorAdjustments = { brightness: 0, contrast: 0 };

  return { ...state, currentEditTab, selectedFilterIndex, colorAdjustments };
}
