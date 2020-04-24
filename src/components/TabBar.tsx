import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import styled from "../design-system/styled";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../store/notifications/selectors";

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  box-shadow: inset 0 1px 0 0 rgba(0, 0, 0, 0.08);
  background: ${(p) => p.theme.colors.white};
  padding-bottom: env(safe-area-inset-bottom);
`;

const Badge = styled.div`
  position: absolute;
  top: ${(p) => p.theme.space[1]};
  left: 50%;
  margin-left: ${(p) => p.theme.space[2]};
  background: ${(p) => p.theme.colors.purple60};
  color: ${(p) => p.theme.colors.white};
  font-size: 10px;
  line-height: 1.1;
  font-weight: bold;
  padding: 2px 4px 2px 5px;
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: ${(p) => p.theme.space[5]};
  transition: background-color 250ms ease-in-out;
`;

const TabBarButton = styled(NavLink)`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  padding: ${(p) => `${p.theme.space[2]} ${p.theme.space[1]}`};

  & :nth-child(1) {
    color: ${(p) => p.theme.colors.gray40};
  }
  & :nth-child(2) {
    color: ${(p) => p.theme.colors.gray70};
  }

  &.active {
    & :nth-child(1) {
      color: ${(p) => p.theme.colors.green50};
    }
    & :nth-child(2) {
      color: ${(p) => p.theme.colors.green70};
    }
  }
`;

export function TabBar() {
  const notificationsBadgeCount = useSelector(
    notificationsSelectors.badgeCount
  );

  return (
    <Wrapper>
      <TabBarButton to="/medication">
        <Icon>med_capsule</Icon>
        <Text size={0} isBold={true}>
          Medication
        </Text>
      </TabBarButton>
      <TabBarButton to="/notifications">
        <Icon>inbox</Icon>
        <Text size={0} isBold={true}>
          Inbox
        </Text>
        {notificationsBadgeCount > 0 ? (
          // <Badge>{notificationsBadgeCount}</Badge>
          <Badge>{notificationsBadgeCount}</Badge>
        ) : null}
      </TabBarButton>
      <TabBarButton to="/help">
        <Icon>headset_mic</Icon>
        <Text size={0} isBold={true}>
          Help
        </Text>
      </TabBarButton>
      <TabBarButton to="/settings">
        <Icon>account_circle</Icon>
        <Text size={0} isBold={true}>
          Account
        </Text>
      </TabBarButton>
    </Wrapper>
  );
}
