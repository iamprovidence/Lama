import filtersList from './filters-list';
import { PhotoState } from '../index';
import { EditTab } from 'src/app/core/enums';
import { ImageFilterDTO, ColorAdjustmentstDTO } from 'src/app/core/models';

export const SLICE_NAME = 'edit';

export interface AppState extends PhotoState {
  [SLICE_NAME]: State;
}

export interface State {
  currentEditTab: EditTab;

  currentImageBase64: string;
  displayedImageBase64: string;
  imageWidth: number;
  imageHeight: number;

  selectedFilterIndex: number;
  filters: string[];
  filtersThumbnails: ImageFilterDTO[];

  colorAdjustments: ColorAdjustmentstDTO;
}

export const InitialState: State = {
  currentEditTab: EditTab.Crop,

  currentImageBase64: '',
  displayedImageBase64: '',
  imageWidth: 0,
  imageHeight: 0,

  selectedFilterIndex: 0,
  filters: filtersList,
  filtersThumbnails: [],

  colorAdjustments: { brightness: 0, contrast: 0 }
};
