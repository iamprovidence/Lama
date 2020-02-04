import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';

import { PhotoListDTO, PhotoToUploadDTO, PhotoToDeleteRestoreDTO } from 'src/app/core/models';

@Injectable()
export class PhotosService {
  private apiUri = `${environment.apiUrl}/api/Photos`;

  constructor(private httpClient: HttpClient) {}

  public getCurrentUserPhotos(): Observable<PhotoListDTO[]> {
    /*
    const mock: PhotoListDTO[] = [
      {
        id: 'asd',
        photoUrl64: 'https://i.picsum.photos/id/367/64/64.jpg',
        photoUrl256: 'https://i.picsum.photos/id/367/256/256.jpg',
        name: 'Lorem picsum iler sit amet doler amit onus romeno irito',
        description: 'Lorem picsum iler sit amet doler amit onus romeno irito',
        uploadDate: 'asd'
      },
      {
        id: 'asds',
        photoUrl64: 'https://i.picsum.photos/id/366/64/64.jpg',
        photoUrl256: 'https://i.picsum.photos/id/366/256/256.jpg',
        name: 'Lorem picsum iler sit amet doler amit onus romeno irito',
        description: 'Lorem picsum iler sit amet doler amit onus romeno irito',
        uploadDate: 'asd'
      },
      {
        id: 'asds1',
        photoUrl64: 'https://i.picsum.photos/id/365/64/64.jpg',
        photoUrl256: 'https://i.picsum.photos/id/365/256/256.jpg',
        name: 'Lorem picsum iler sit amet doler amit onus romeno irito',
        description: 'Lorem picsum iler sit amet doler amit onus romeno irito',
        uploadDate: 'asd'
      },
      {
        id: 'asds2',
        photoUrl64: 'https://i.picsum.photos/id/364/64/64.jpg',
        photoUrl256: 'https://i.picsum.photos/id/364/256/256.jpg',
        name: 'Lorem picsum iler sit amet doler amit onus romeno irito',
        description: 'Lorem picsum iler sit amet doler amit onus romeno irito',
        uploadDate: 'asd'
      }
    ];

    return of(mock);
*/
    return this.httpClient.get<PhotoListDTO[]>(`${this.apiUri}/`);
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

    return this.httpClient.delete(`${this.apiUri}/`, options);
  }

  public uploadPhotos(photos: PhotoToUploadDTO[]): Observable<PhotoListDTO[]> {
    return this.httpClient.post<PhotoListDTO[]>(`${this.apiUri}/`, photos);
  }
}
