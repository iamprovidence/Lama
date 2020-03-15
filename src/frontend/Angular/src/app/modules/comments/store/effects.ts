import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { CommentsService as ApiService } from '../comments.service';
import * as StoreActions from '../store/actions';

import { AddCommentDTO } from 'src/app/core/models';

@Injectable()
export class CommentsEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  @Effect()
  loadComments$: Observable<Action> = this.actions$.pipe(
    ofType(StoreActions.ActionTypes.LoadComments),
    map((action: StoreActions.LoadComments) => action.payload),
    mergeMap((photoId: string) =>
      this.apiService.getComments(photoId).pipe(
        map(photo => new StoreActions.LoadCommentsSucceed(photo)),
        catchError(err => of(new StoreActions.LoadCommentsFailed(err)))
      )
    )
  );

  @Effect()
  addComment$: Observable<Action> = this.actions$.pipe(
    ofType(StoreActions.ActionTypes.AddComment),
    map((action: StoreActions.AddComment) => action.payload),
    mergeMap((commentToAdd: AddCommentDTO) =>
      this.apiService.addComment(commentToAdd).pipe(map(comment => new StoreActions.AddCommentSucceed(comment)))
    )
  );

  @Effect({ dispatch: false })
  deleteComment$: Observable<object> = this.actions$.pipe(
    ofType(StoreActions.ActionTypes.DeleteComment),
    map((action: StoreActions.DeleteComment) => action.payload),
    mergeMap((deletedCommentId: number) => this.apiService.deleteComment(deletedCommentId))
  );
}
