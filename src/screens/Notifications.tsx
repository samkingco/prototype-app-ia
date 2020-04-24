import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import styled from "../design-system/styled";
import { Card } from "../design-system/Card";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { Text } from "../design-system/Text";
import { PageContents } from "../design-system/PageContents";
import {
  notificationsSelectors,
  ComputedNotification,
} from "../store/notifications/selectors";
import { PageTitle } from "../components/PageTitle";
import { ScreenWithSidebar } from "../components/ScreenWithSidebar";

const UnreadBadge = styled.div`
  flex-shrink: 0;
  width: ${(p) => p.theme.space[1]};
  height: ${(p) => p.theme.space[1]};
  margin-right: ${(p) => p.theme.space[1]};
  background: ${(p) => p.theme.colors.blue60};
  border-radius: ${(p) => p.theme.space[1]};
`;

interface NotificationListItemProps {
  notification: ComputedNotification;
}

function NotificationListItem(props: NotificationListItemProps) {
  const { url } = useRouteMatch();
  const { notification } = props;

  return (
    <ListItem
      key={`your_meds_${notification.id}`}
      to={`${url}/${notification.id}`}
      linkType="push"
      renderComponentLeft={!notification.hasBeenRead ? <UnreadBadge /> : null}
      title={
        <Text color="gray90" isBold={!notification.hasBeenRead}>
          {notification.title}
        </Text>
      }
      subtitle={formatDistanceToNow(notification.sendDate, {
        addSuffix: true,
      })}
    >
      {/* {!notification.hasBeenRead ? <UnreadBadge /> : null} */}
      <Text color="gray90" isBold={!notification.hasBeenRead}>
        {notification.title}
      </Text>
      <Text color="gray70" size={1}>
        {formatDistanceToNow(notification.sendDate, {
          addSuffix: true,
        })}
      </Text>
    </ListItem>
  );
}

export function Notifications() {
  const notificationsList = useSelector(notificationsSelectors.list);

  return (
    <ScreenWithSidebar>
      <PageContents>
        <PageTitle title="Notifications" useXLargeTitle={true} />
        {notificationsList.length > 0 ? (
          <Card onlyHasList={true}>
            <List gap={1}>
              {notificationsList.map((notification) => (
                <NotificationListItem
                  key={`unread_${notification.id}`}
                  notification={notification}
                />
              ))}
            </List>
          </Card>
        ) : null}
      </PageContents>
    </ScreenWithSidebar>
  );
}
