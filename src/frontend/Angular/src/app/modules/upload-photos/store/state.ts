import { PhotoToUploadDTO } from 'src/app/core/models';
import { State as RootState } from 'src/app/app.state';

export const SLICE_NAME = 'upload-photos';

export interface AppState extends RootState {
  [SLICE_NAME]: State;
}

export interface State {
  isUploadPhotoModalOpen: boolean;
  uploadedPhotos: PhotoToUploadDTO[];
}

export const InitialState: State = {
  isUploadPhotoModalOpen: false,
  uploadedPhotos: []
};
