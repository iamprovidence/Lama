import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';

import { PhotoViewDTO, UpdatePhotoDTO, OriginalPhotoDTO, EditPhotoDTO } from 'src/app/core/models';

@Injectable()
export class PhotoDetailsService {
  private apiUri = `${environment.apiUrl}/api/Photos`;

  constructor(private httpClient: HttpClient) {}

  public getPhoto(photoId: string): Observable<PhotoViewDTO> {
    return this.httpClient.get<PhotoViewDTO>(`${this.apiUri}/${photoId}`);
  }

  public getOriginalPhoto(photoId: string): Observable<OriginalPhotoDTO> {
    return this.httpClient.get<OriginalPhotoDTO>(`${this.apiUri}/original/${photoId}`);
  }

  public updatePhoto(updatePhoto: UpdatePhotoDTO): Observable<PhotoViewDTO> {
    return this.httpClient.post<PhotoViewDTO>(`${this.apiUri}/update`, updatePhoto);
  }

  public editPhoto(editPhoto: EditPhotoDTO): Observable<PhotoViewDTO> {
    return this.httpClient.post<PhotoViewDTO>(`${this.apiUri}/edit`, editPhoto);
  }
}
