import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch, GetState } from "..";
import { notificationsFakeData, Notification } from "./fake-data";
import { requestSelectors } from "../requests/selectors";

interface NotificationsState {
  notifications: {
    [id: string]: Notification;
  };
}

const initialState: NotificationsState = {
  notifications: notificationsFakeData.reduce(
    (state, notification) => ({
      ...state,
      [notification.id]: notification,
    }),
    {}
  ),
};

export const { actions, reducer } = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    reset: () => initialState,
    markAsRead: (state, action: PayloadAction<{ notificationId: string }>) => {
      state.notifications[action.payload.notificationId].hasBeenRead = true;
    },
    markAsUnread: (
      state,
      action: PayloadAction<{ notificationId: string }>
    ) => {
      state.notifications[action.payload.notificationId].hasBeenRead = false;
    },
    markAsDone: (state, action: PayloadAction<{ notificationId: string }>) => {
      state.notifications[action.payload.notificationId].hasBeenDone = true;
      state.notifications[action.payload.notificationId].doneDate = Date.now();
    },
    markAsTodo: (state, action: PayloadAction<{ notificationId: string }>) => {
      state.notifications[action.payload.notificationId].hasBeenDone = false;
      state.notifications[action.payload.notificationId].doneDate = undefined;
    },
    setChosenAction: (
      state,
      action: PayloadAction<{ notificationId: string; chosenAction: string }>
    ) => {
      state.notifications[action.payload.notificationId].chosenAction =
        action.payload.chosenAction;
    },
    addStockNotification: (
      state,
      action: PayloadAction<{
        requestId: string;
      }>
    ) => {
      state.notifications["4"] = {
        id: "4",
        type: "stock_update",
        sendDate: Date.now(),
        patientId: "1",
        requestId: action.payload.requestId,
      };
    },
  },
});

export function reset() {
  return function (dispatch: Dispatch) {
    dispatch(actions.reset());
  };
}

export function markAsRead(notificationId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.markAsRead({ notificationId }));
  };
}

export function markAsUnread(notificationId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.markAsUnread({ notificationId }));
  };
}

export function markAsDone(notificationId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.markAsDone({ notificationId }));
  };
}

export function markAsTodo(notificationId: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.markAsTodo({ notificationId }));
  };
}

export function setChosenAction(notificationId: string, chosenAction: string) {
  return function (dispatch: Dispatch) {
    dispatch(actions.setChosenAction({ notificationId, chosenAction }));
  };
}

export function addStockNotification(requestId?: string) {
  return function (dispatch: Dispatch, getState: GetState) {
    let forRequestId;
    if (!requestId) {
      forRequestId = requestSelectors.latestRequest(getState()).id;
    } else {
      forRequestId = requestId;
    }
    dispatch(actions.addStockNotification({ requestId: forRequestId }));
  };
}
