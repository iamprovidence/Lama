import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';

import { CommentListDTO, AddCommentDTO } from 'src/app/core/models';

@Injectable()
export class CommentsService {
  private apiUri = `${environment.apiUrl}/api/Comments`;

  constructor(private httpClient: HttpClient) {}

  public getComments(photoId: string): Observable<CommentListDTO[]> {
    return this.httpClient.get<CommentListDTO[]>(`${this.apiUri}/all/`, { params: { photoId } });
  }

  public addComment(commentToAdd: AddCommentDTO): Observable<CommentListDTO> {
    return this.httpClient.post<CommentListDTO>(`${this.apiUri}/add`, commentToAdd);
  }

  public deleteComment(commentId: number): Observable<object> {
    const params = { commentId: commentId.toString() };

    return this.httpClient.delete(`${this.apiUri}/delete`, { params });
  }
}
