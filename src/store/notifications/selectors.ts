import { AppState } from "..";
import { Notification, NotificationType } from "./fake-data";

export interface ComputedNotification extends Notification {
  hasBeenRead: boolean;
  title: string;
}

const typeToTitleMap: { [key in NotificationType]: string } = {
  dispatch: "We’ve sent your medication",
  rx_returned: "We’ve returned your prescription",
  // stock_update: "Some medication you requested is delayed",
  stock_update: "Some medication you requested is currently unavailable",
  request_rx: "It’s time to request your prescription",
};

function byId(
  state: AppState,
  notificationId: string
): ComputedNotification | undefined {
  const notification = state.notifications.notifications[notificationId];

  if (!notification) {
    return;
  }

  return {
    ...notification,
    hasBeenRead: Boolean(notification.hasBeenRead),
    title: typeToTitleMap[notification.type],
  };
}

function list(state: AppState): ComputedNotification[] {
  const res = [];
  for (const notificationId of Object.keys(state.notifications.notifications)) {
    if (state.notifications.notifications[notificationId]) {
      const notification = byId(state, notificationId);
      if (notification) {
        res.push(notification);
      }
    }
  }

  return res.sort((a, b) => (a.sendDate > b.sendDate ? -1 : 1));
}

function unreadCount(state: AppState): number {
  const allNotifications = list(state);
  return allNotifications.reduce((unreadCount, notification) => {
    if (notification.hasBeenRead) {
      return unreadCount;
    }

    return unreadCount + 1;
  }, 0);
}

export const notificationsSelectors = {
  byId,
  list,
  unreadCount,
};
