import { Actions, ActionTypes } from './actions';
import { InitialState, State } from './state';
import { DataState } from 'src/app/core/enums';

export function reducer(state: State = InitialState, action: Actions): State {
  switch (action.type) {
    case ActionTypes.LoadNotifications:
      return { ...state, isLoading: DataState.Loading };
    case ActionTypes.LoadNotificationsSucceed:
      return {
        ...state,
        isLoading: action.payload.length === 0 ? DataState.NoContent : DataState.DisplayContent,
        notifications: action.payload
      };
    case ActionTypes.LoadNotificationsFailed:
      return {
        ...state,
        isLoading: DataState.Failed
      };
    case ActionTypes.ClearNotifications: {
      return { ...state, notifications: [], isLoading: DataState.DisplayContent };
    }

    case ActionTypes.MarkNotificationAsRead: {
      return markNotificationAsRead(state, action.payload);
    }

    default:
      return state;
  }
}

function markNotificationAsRead(state: State, notificationId: number): State {
  const notifications = state.notifications.filter(n => n.id !== notificationId);
  const isLoading = notifications.length === 0 ? DataState.NoContent : DataState.DisplayContent;

  return { ...state, isLoading, notifications };
}
