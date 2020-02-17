import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { AlbumListDTO, CreateAlbumDTO, EditAlbumDTO } from 'src/app/core/models';

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
}
