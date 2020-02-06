import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';
import { DataState } from 'src/app/core/enums';
import { CommentListDTO } from 'src/app/core/models';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadComments:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadCommentsSucceed:
      return {
        ...state,
        comments: action.payload,
        isLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent
      };
    case ActionTypes.LoadCommentsFailed:
      return { ...state, isLoading: DataState.Failed };
    case ActionTypes.ClearComments:
      return { ...state, comments: [], isLoading: DataState.NoContent };

    case ActionTypes.AddCommentSucceed:
      return addComment(state, action.payload);

    case ActionTypes.DeleteComment:
      return deleteComment(state, action.payload);

    default:
      return state;
  }
}

function addComment(state: State, createdComment: CommentListDTO): State {
  const comments = [createdComment, ...state.comments];
  const isLoading = comments.length === 0 ? DataState.NoContent : DataState.DisplayContent;

  return { ...state, comments, isLoading };
}

function deleteComment(state: State, deletedCommentId: number): State {
  const comments = state.comments.filter(c => c.id !== deletedCommentId);
  const isLoading = comments.length === 0 ? DataState.NoContent : DataState.DisplayContent;

  return { ...state, comments, isLoading };
}
