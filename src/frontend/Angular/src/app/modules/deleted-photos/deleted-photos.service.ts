import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { DeletedPhotosListDTO, PhotoToDeleteRestoreDTO } from 'src/app/core/models';

@Injectable()
export class DeletedPhotosService {
  private apiUri = `${environment.apiUrl}/api/DeletedPhotos`;

  constructor(private httpClient: HttpClient) {}

  public getCurrentUserDeletedPhotos(): Observable<DeletedPhotosListDTO[]> {
    return this.httpClient.get<DeletedPhotosListDTO[]>(`${this.apiUri}/all`);
  }

  public restoresDeletedPhotos(photosToRestore: PhotoToDeleteRestoreDTO[]): Observable<object> {
    return this.httpClient.post(`${this.apiUri}/restore`, photosToRestore);
  }

  private getOptionsWithBody<TBody>(body: TBody): { headers: HttpHeaders; body: TBody } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body
    };
  }

  public deletePhotosPermanently(photosToDelete: PhotoToDeleteRestoreDTO[]): Observable<object> {
    const options = this.getOptionsWithBody(photosToDelete);

    return this.httpClient.delete(`${this.apiUri}/clear`, options);
  }
}
