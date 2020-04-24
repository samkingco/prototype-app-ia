import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { format } from "date-fns";
import { PageContents } from "../design-system/PageContents";
import { notificationsSelectors } from "../store/notifications/selectors";
import { markAsRead } from "../store/notifications/slice";
import { NotificationTypeDispatch } from "../components/NotificationTypeDispatch";
import { NotificationTypeRxReturned } from "../components/NotificationTypeRxReturned";
import { NotificationTypeStockUpdate } from "../components/NotificationTypeStockUpdate";
import { NotificationTypeRequestRx } from "../components/NotificationTypeRequestRx";
import { ScreenWithSidebar } from "../components/ScreenWithSidebar";
import { PageTitle, PageTitleBackAction } from "../components/PageTitle";

interface Params {
  notificationId: string;
}

export function NotificationDetail() {
  const dispatch = useDispatch();
  const { params } = useRouteMatch<Params>();
  const { notificationId } = params;
  const notification = useSelector((s) =>
    notificationsSelectors.byId(s, notificationId)
  );

  if (!notification) {
    return null;
  }

  if (!notification.hasBeenRead) {
    dispatch(markAsRead(notification.id));
  }

  return (
    <ScreenWithSidebar>
      <PageContents>
        <PageTitle
          title={notification.title}
          subtitle={format(notification.sendDate, "do MMMM, yyyy")}
          leftAction={<PageTitleBackAction />}
        />
        {notification.type === "dispatch" && (
          <NotificationTypeDispatch notification={notification} />
        )}
        {notification.type === "rx_returned" && (
          <NotificationTypeRxReturned notification={notification} />
        )}
        {notification.type === "stock_update" && (
          <NotificationTypeStockUpdate notification={notification} />
        )}
        {notification.type === "request_rx" && (
          <NotificationTypeRequestRx notification={notification} />
        )}
      </PageContents>
    </ScreenWithSidebar>
  );
}
