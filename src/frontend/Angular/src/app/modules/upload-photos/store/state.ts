import { PhotoToUploadDTO } from 'src/app/core/models';

export const SLICE_NAME = 'upload-photos';

export interface State {
  isUploadPhotoModalOpen: boolean;
  uploadedPhotos: PhotoToUploadDTO[];
}

export const InitialState: State = {
  isUploadPhotoModalOpen: false,
  uploadedPhotos: []
};
