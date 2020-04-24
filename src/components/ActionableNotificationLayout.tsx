import React, { useState } from "react";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import { Divider } from "../design-system/Divider";
import { ComputedNotification } from "../store/notifications/selectors";
import { format } from "date-fns";
import { ListItem } from "../design-system/ListItem";
import { Icon } from "../design-system/Icon";
import styled from "../design-system/styled";

const DoneLockup = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-gap: ${(p) => p.theme.space[2]};
  align-items: center;
`;

interface Props {
  notification: ComputedNotification;
  originalContent: React.ReactNode;
  doneContent: React.ReactNode;
  doneVerb?: string;
}

export function ActionableNotificationLayout(props: Props) {
  const [showOriginal, setShowOriginal] = useState(false);
  const { notification, originalContent, doneContent } = props;

  return (
    <>
      {notification.hasBeenDone ? (
        <Card>
          <DoneLockup>
            <Icon color="green50">done</Icon>
            <div>
              <Text isBold={true}>{props.doneVerb || "Confirmed"}</Text>
              <Text size={1} color="gray70">
                {notification.doneDate
                  ? ` ${format(notification.doneDate, "d MMMM, yyyy")}`
                  : null}
              </Text>
            </div>
          </DoneLockup>
          <Divider extendRight={true} />
          {doneContent}
        </Card>
      ) : null}
      {notification.hasBeenDone && !showOriginal ? (
        <Card hasListItemAtStart={true} hasListItemAtEnd={true}>
          <ListItem
            title="Show original notification"
            linkType="modal"
            iconRight="expand_more"
            onClick={() => setShowOriginal(true)}
          />
        </Card>
      ) : (
        <Card>
          {notification.hasBeenDone ? (
            <>
              <Text isBold={true}>Original notification</Text>
              <Divider extendRight={true} />
            </>
          ) : null}
          {originalContent}
        </Card>
      )}
    </>
  );
}
