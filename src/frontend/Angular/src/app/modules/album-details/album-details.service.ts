import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { PhotoListDTO, PhotoAlbumDTO } from 'src/app/core/models';

@Injectable()
export class AlbumDetailsService {
  private apiUri = `${environment.apiUrl}/api/PhotoAlbums`;

  constructor(private httpClient: HttpClient) {}

  public updateAlbumPhotos(albumId: number, photos: PhotoAlbumDTO[]): Observable<object> {
    return this.httpClient.post(`${this.apiUri}/update`, { albumId, photos });
  }

  public deleteAlbumPhotos(photos: PhotoAlbumDTO[]): Observable<object> {
    const options = this.getOptionsWithBody({ photos });

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

  public getAlbumPhotos(albumId: number): Observable<PhotoAlbumDTO[]> {
    return this.httpClient.get<PhotoAlbumDTO[]>(`${this.apiUri}/all/`, { params: { albumId: albumId.toString() } });
  }

  public getCurrentUserPhotos(): Observable<PhotoListDTO[]> {
    return this.httpClient.get<PhotoListDTO[]>(`${environment.apiUrl}/api/Photos/all`);
  }
}
