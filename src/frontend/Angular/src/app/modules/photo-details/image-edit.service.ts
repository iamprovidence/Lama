import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import ImageFilters from 'canvas-filters';
import { ImageFilterDTO, ColorAdjustmentstDTO } from 'src/app/core/models';

declare const pixelsJS: any;

type EditImageDelegate = (canvasImageData: ImageData) => ImageData;

@Injectable()
export class ImageEditService {
  constructor() {}

  public getImageBase64(url: string): Observable<string> {
    return from(this.getImageBase64Promise(url));
  }

  private async getImageBase64Promise(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  public setColorAdjustments(imageSrc: string, adjustmentst: ColorAdjustmentstDTO): Observable<string> {
    const setColorAdjustmentDelegate = (imageData: ImageData) =>
      ImageFilters.BrightnessContrastPhotoshop(imageData, adjustmentst.brightness, adjustmentst.contrast);

    return from(this.editImagePromise(imageSrc, setColorAdjustmentDelegate));
  }

  public applyFilter(imageSrc: string, filter: string): Observable<ImageFilterDTO> {
    const applyFilterDelegate = (imageData: ImageData) =>
      filter ? pixelsJS.filterImgData(imageData, filter) : imageData;

    return from(this.editImagePromise(imageSrc, applyFilterDelegate)).pipe(
      map((imageBase64: string) => ({ filterName: filter, imageBase64Thumbnails: imageBase64 } as ImageFilterDTO))
    );
  }

  private editImagePromise(imageSrc: string, editImageDelegate: EditImageDelegate): Promise<string> {
    return new Promise<string>(resolve => {
      const image = this.createImage(imageSrc);

      image.onload = () => {
        const filteredImageBase64 = this.editImageOnCanvas(image, editImageDelegate);
        resolve(filteredImageBase64);
      };
    });
  }

  private createImage(imageSrc: string): HTMLImageElement {
    const image = new Image();
    image.crossOrigin = '';
    image.src = imageSrc;
    return image;
  }

  private editImageOnCanvas(image: HTMLImageElement, editImageDelegate: EditImageDelegate): string {
    const { width, height } = image;

    const canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const canvasImage = ctx.getImageData(0, 0, width, height);

    const editedImage = editImageDelegate(canvasImage);
    ctx.putImageData(editedImage, 0, 0);

    return canvas.toDataURL('image/jpeg');
  }
}
