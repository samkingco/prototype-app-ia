import { AppState } from "..";
import { Notification, NotificationType } from "./fake-data";

export interface ComputedNotification extends Notification {
  hasBeenRead: boolean;
  needsAction: boolean;
  title: string;
}

const typeToTitleMap: { [key in NotificationType]: string } = {
  dispatch: "We’ve sent your medication",
  rx_returned: "Here’s your prescription barcode",
  stock_update: "Some medication you requested is currently unavailable",
  request_rx: "It’s time to request your prescription",
};

function byId(
  state: AppState,
  notificationId: string
): ComputedNotification | undefined {
  const notification = state.notifications.notifications[notificationId];
  const nonActionableTypes: NotificationType[] = ["dispatch", "rx_returned"];

  if (!notification) {
    return;
  }

  return {
    ...notification,
    needsAction: Boolean(
      !notification.hasBeenDone &&
        !nonActionableTypes.includes(notification.type)
    ),
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

function badgeCount(state: AppState): number {
  const allNotifications = list(state);
  return allNotifications.reduce((badgeCount, notification) => {
    if (notification.hasBeenRead && !notification.needsAction) {
      return badgeCount;
    }

    return badgeCount + 1;
  }, 0);
}

export const notificationsSelectors = {
  byId,
  list,
  badgeCount,
};
