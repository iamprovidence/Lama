import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable, of } from 'rxjs';

import { SearchHistoryListDTO, AddSearchDTO } from 'src/app/core/models';

@Injectable()
export class PhotosSearchService {
  private apiUri = `${environment.apiUrl}/api/SearchHistory`;

  constructor(private httpClient: HttpClient) {}

  public saveSearch(searchToAdd: AddSearchDTO): Observable<SearchHistoryListDTO> {
    return this.httpClient.post<SearchHistoryListDTO>(`${this.apiUri}/add`, searchToAdd);
  }

  public getCurrentUserSearch(maxAmount: number): Observable<SearchHistoryListDTO[]> {
    const params = { maxAmount: maxAmount.toString() };

    return this.httpClient.get<SearchHistoryListDTO[]>(`${this.apiUri}/all`, { params });
  }
}
