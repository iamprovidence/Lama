import { Action } from '@ngrx/store';
import { CommentListDTO, AddCommentDTO } from 'src/app/core/models';

export enum ActionTypes {
  LoadComments = '[COMMENTS] LoadComments',
  LoadCommentsSucceed = '[COMMENTS] LoadCommentsSucceed',
  LoadCommentsFailed = '[COMMENTS] LoadCommentsFailed',
  ClearComments = '[COMMENTS] ClearComments',

  AddComment = '[COMMENTS] AddComment',
  AddCommentSucceed = '[COMMENTS] AddCommentSucceed',

  DeleteComment = '[COMMENTS] DeleteComment'
}

export class LoadComments implements Action {
  readonly type = ActionTypes.LoadComments;
  constructor(public payload: string) {}
}

export class LoadCommentsSucceed implements Action {
  readonly type = ActionTypes.LoadCommentsSucceed;
  constructor(public payload: CommentListDTO[]) {}
}

export class LoadCommentsFailed implements Action {
  readonly type = ActionTypes.LoadCommentsFailed;
  constructor(public payload: string) {}
}

export class ClearComments implements Action {
  readonly type = ActionTypes.ClearComments;
}

export class AddComment implements Action {
  readonly type = ActionTypes.AddComment;
  constructor(public payload: AddCommentDTO) {}
}

export class AddCommentSucceed implements Action {
  readonly type = ActionTypes.AddCommentSucceed;
  constructor(public payload: CommentListDTO) {}
}

export class DeleteComment implements Action {
  readonly type = ActionTypes.DeleteComment;
  constructor(public payload: number) {}
}

export type Actions =
  | LoadComments
  | LoadCommentsSucceed
  | LoadCommentsFailed
  | ClearComments
  | AddComment
  | AddCommentSucceed
  | DeleteComment;
