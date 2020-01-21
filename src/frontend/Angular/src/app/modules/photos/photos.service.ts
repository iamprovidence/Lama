import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { PhotoListDTO, PhotoToUploadDTO } from 'src/app/core/models';

@Injectable()
export class PhotosService {
  private apiUri = `${environment.apiUrl}/api/Photos`;

  constructor(private httpClient: HttpClient) {}

  public getCurrentUserPhotos(): Observable<PhotoListDTO[]> {
    return this.httpClient.get<PhotoListDTO[]>(`${this.apiUri}/`);
  }

  public uploadPhotos(photos: PhotoToUploadDTO[]): Observable<PhotoListDTO[]> {
    return this.httpClient.post<PhotoListDTO[]>(`${this.apiUri}/`, photos);
  }
}
