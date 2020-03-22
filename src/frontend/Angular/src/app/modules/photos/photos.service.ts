import { environment } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PhotoListDTO, PhotoToUploadDTO, PhotoToDeleteRestoreDTO } from 'src/app/core/models';

import { saveAs } from 'file-saver';

@Injectable()
export class PhotosService {
  private apiUri = `${environment.apiUrl}/api/Photos`;

  constructor(private httpClient: HttpClient) {}

  public getCurrentUserPhotos(): Observable<PhotoListDTO[]> {
    return this.httpClient.get<PhotoListDTO[]>(`${this.apiUri}/all`);
  }

  public getSharedPhotos(): Observable<PhotoListDTO[]> {
    return this.httpClient.get<PhotoListDTO[]>(`${this.apiUri}/shared`);
  }

  public searchPhotos(searchPayload: string): Observable<PhotoListDTO[]> {
    return this.httpClient.get<PhotoListDTO[]>(`${this.apiUri}/search`, { params: { searchPayload } });
  }

  public downloadPhotos(photoIds: string[]): Observable<ArrayBuffer> {
    return this.httpClient
      .post(`${this.apiUri}/download`, photoIds, {
        observe: 'body',
        responseType: 'arraybuffer'
      })
      .pipe(tap((data: ArrayBuffer) => this.downloadFile(data)));
  }

  private downloadFile(data: ArrayBuffer): void {
    const blob = new Blob([data], { type: 'application/vnd.rar' });
    saveAs(blob, 'Photos.rar');
  }

  public markPhotosAsDeleted(photosToDelete: PhotoToDeleteRestoreDTO[]): Observable<object> {
    const options = this.getOptionsWithBody(photosToDelete);

    return this.httpClient.delete(`${this.apiUri}/delete`, options);
  }

  private getOptionsWithBody<TBody>(body: TBody): { headers: HttpHeaders; body: TBody } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body
    };
  }

  public uploadPhotos(photos: PhotoToUploadDTO[]): Observable<PhotoListDTO[]> {
    return this.httpClient.post<PhotoListDTO[]>(`${this.apiUri}/upload`, photos);
  }
}
