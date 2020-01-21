import { PhotoListDTO } from 'src/app/core/models';
import { PhotoViewType } from 'src/app/core/enums';

export const SLICE_NAME = 'photos';

export interface State {
  viewType: PhotoViewType;
  photos: PhotoListDTO[];
}

export const InitialState: State = {
  viewType: PhotoViewType.Cards,
  photos: []
};
