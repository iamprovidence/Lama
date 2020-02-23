import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { PhotoListDTO, PhotoToUploadDTO, PhotoToDeleteRestoreDTO } from 'src/app/core/models';

@Injectable()
export class PhotosService {
  private apiUri = `${environment.apiUrl}/api/Photos`;

  constructor(private httpClient: HttpClient) {}

  public getCurrentUserPhotos(): Observable<PhotoListDTO[]> {
    return this.httpClient.get<PhotoListDTO[]>(`${this.apiUri}/all`);
  }

  public searchPhotos(searchPayload: string): Observable<PhotoListDTO[]> {
    return this.httpClient.get<PhotoListDTO[]>(`${this.apiUri}/search`, { params: { searchPayload } });
  }

  private getOptionsWithBody<TBody>(body: TBody): { headers: HttpHeaders; body: TBody } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body
    };
  }

  public markPhotosAsDeleted(photosToDelete: PhotoToDeleteRestoreDTO[]): Observable<object> {
    const options = this.getOptionsWithBody(photosToDelete);

    return this.httpClient.delete(`${this.apiUri}/delete`, options);
  }

  public uploadPhotos(photos: PhotoToUploadDTO[]): Observable<PhotoListDTO[]> {
    return this.httpClient.post<PhotoListDTO[]>(`${this.apiUri}/upload`, photos);
  }
}
