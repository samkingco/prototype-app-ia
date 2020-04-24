import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import styled from "../design-system/styled";

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-top: 1px solid ${(p) => p.theme.colors.gray10};
  background: ${(p) => p.theme.colors.white};
  padding-bottom: env(safe-area-inset-bottom);
`;

const TabBarButton = styled(NavLink)`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  padding: ${(p) => `${p.theme.space[1]} ${p.theme.space[0]}`};

  & :nth-child(1) {
    color: ${(p) => p.theme.colors.gray40};
  }
  & :nth-child(2) {
    color: ${(p) => p.theme.colors.gray70};
  }

  &.active {
    & :nth-child(1) {
      color: ${(p) => p.theme.colors.blue60};
    }
    & :nth-child(2) {
      color: ${(p) => p.theme.colors.blue70};
    }
  }
`;

export function TabBar() {
  return (
    <Wrapper>
      <TabBarButton to="/medication">
        <Icon>med_capsule</Icon>
        <Text size={0} isBold={true}>
          Medication
        </Text>
      </TabBarButton>
      <TabBarButton to="/notifications">
        <Icon>notifications</Icon>
        <Text size={0} isBold={true}>
          Notifications
        </Text>
      </TabBarButton>
      <TabBarButton to="/help">
        <Icon>headset_mic</Icon>
        <Text size={0} isBold={true}>
          Help
        </Text>
      </TabBarButton>
      <TabBarButton to="/settings">
        <Icon>settings</Icon>
        <Text size={0} isBold={true}>
          Settings
        </Text>
      </TabBarButton>
    </Wrapper>
  );
}
