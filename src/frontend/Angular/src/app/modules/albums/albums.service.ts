import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AlbumListDTO, CreateAlbumDTO, EditAlbumDTO } from 'src/app/core/models';

import { saveAs } from 'file-saver';

@Injectable()
export class AlbumsService {
  private apiUri = `${environment.apiUrl}/api/Albums`;

  constructor(private httpClient: HttpClient) {}

  public createAlbum(albumToCreate: CreateAlbumDTO): Observable<AlbumListDTO> {
    return this.httpClient.post<AlbumListDTO>(`${this.apiUri}/add`, albumToCreate);
  }

  public editAlbum(albumToEdit: EditAlbumDTO): Observable<AlbumListDTO> {
    return this.httpClient.put<AlbumListDTO>(`${this.apiUri}/update`, albumToEdit);
  }

  public deleteAlbum(albumId: number): Observable<boolean> {
    const params = { albumId: albumId.toString() };

    return this.httpClient.delete<boolean>(`${this.apiUri}/delete`, { params });
  }

  public getCurrentUserAlbums(): Observable<AlbumListDTO[]> {
    return this.httpClient.get<AlbumListDTO[]>(`${this.apiUri}/all/`);
  }

  public downloadAlbum(albumId: number): Observable<ArrayBuffer> {
    return this.httpClient
      .post(
        `${this.apiUri}/download`,
        {
          albumId: albumId.toString()
        },
        {
          observe: 'body',
          responseType: 'arraybuffer'
        }
      )
      .pipe(tap((data: ArrayBuffer) => this.downloadFile(data)));
  }

  private downloadFile(data: ArrayBuffer): void {
    const blob = new Blob([data], { type: 'application/vnd.rar' });
    saveAs(blob, 'Album.rar');
  }
}
