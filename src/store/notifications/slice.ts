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
