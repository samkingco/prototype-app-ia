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
import { NavigationBar } from "../components/NavigationBar";
import { TabBar } from "../components/TabBar";
import { Divider } from "../design-system/Divider";
import { Tag } from "../design-system/Tag";

const UnreadBadge = styled.div`
  width: 24px;
  flex-shrink: 0;
  width: ${(p) => p.theme.space[2]};
  height: ${(p) => p.theme.space[2]};
  background: ${(p) => p.theme.colors.purple60};
  border-radius: ${(p) => p.theme.space[2]};
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
      title={
        <Text color="gray90" isBold={!notification.hasBeenRead}>
          {notification.title}
        </Text>
      }
      subtitle={formatDistanceToNow(notification.sendDate, {
        addSuffix: true,
      })}
      renderComponentLeft={!notification.hasBeenRead ? <UnreadBadge /> : null}
      additionalContent={
        notification.needsAction ? (
          <>
            {!notification.hasBeenRead && <div />}
            <div>
              <Tag variant="warning">Action needed</Tag>
            </div>
          </>
        ) : null
      }
    />
  );
}

export function Notifications() {
  const notificationsList = useSelector(notificationsSelectors.list);

  return (
    <>
      <NavigationBar title="Inbox" useXLargeTitle={true} />
      <PageContents>
        {notificationsList.length > 0 ? (
          <Card hasListItemAtEnd={true} hasListItemAtStart={true}>
            {notificationsList.length > 0 ? (
              <List gap={1}>
                {notificationsList.map((notification, index) => (
                  <>
                    <NotificationListItem
                      key={`unread_${notification.id}`}
                      notification={notification}
                    />
                    {index !== notificationsList.length - 1 ? (
                      <Divider extendRight={true} />
                    ) : null}
                  </>
                ))}
              </List>
            ) : null}
          </Card>
        ) : null}
      </PageContents>
      <TabBar />
    </>
  );
}
