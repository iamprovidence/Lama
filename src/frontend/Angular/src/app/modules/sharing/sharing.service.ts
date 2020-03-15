import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { SharedEmailsListDTO, SharePhotoDTO, DeleteSharedPhotoDTO } from 'src/app/core/models';

@Injectable()
export class SharingService {
  private apiUri = `${environment.apiUrl}/api/Sharing`;

  constructor(private httpClient: HttpClient) {}

  public getSharedEmails(photoId: string): Observable<SharedEmailsListDTO[]> {
    const params = { photoId: photoId.toString() };

    return this.httpClient.get<SharedEmailsListDTO[]>(`${this.apiUri}/emails`, { params });
  }

  public sharePhoto(sharePhoto: SharePhotoDTO): Observable<SharedEmailsListDTO> {
    return this.httpClient.post<SharedEmailsListDTO>(`${this.apiUri}/share-photo`, sharePhoto);
  }

  public deleteSharedPhoto(deleteSharedPhoto: DeleteSharedPhotoDTO): Observable<object> {
    return this.httpClient.delete(`${this.apiUri}/delete`, { params: { ...deleteSharedPhoto } });
  }
}
