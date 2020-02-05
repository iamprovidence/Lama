import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { PhotoViewDTO } from 'src/app/core/models';

@Injectable()
export class PhotoDetailsService {
  private apiUri = `${environment.apiUrl}/api/Photos`;

  constructor(private httpClient: HttpClient) {}

  public getPhoto(photoId: string): Observable<PhotoViewDTO> {
    return this.httpClient.get<PhotoViewDTO>(`${this.apiUri}/${photoId}`);
  }
}
