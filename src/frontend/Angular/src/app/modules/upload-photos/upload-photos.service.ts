import { Injectable } from '@angular/core';
import { Observable, from, forkJoin } from 'rxjs';

import { PhotoToUploadDTO } from 'src/app/core/models';

@Injectable()
export class UploadPhotosService {
  constructor() {}

  public readFilesAsImages(imageFiles: File[]): Observable<PhotoToUploadDTO[]> {
    return forkJoin(imageFiles.map(this.toUploadedImage));
  }

  private toUploadedImage(imageFile: File): Observable<PhotoToUploadDTO> {
    const reader = new FileReader();

    const promise = new Promise<PhotoToUploadDTO>((resolve, reject) => {
      reader.readAsDataURL(imageFile);
      reader.onload = () =>
        resolve({
          name: imageFile.name,
          description: '',
          base64Image: reader.result as string
        });
      reader.onerror = error => reject(error);
    });

    return from(promise);
  }
}
