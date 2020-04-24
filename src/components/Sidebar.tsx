import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import styled from "../design-system/styled";
import { Logo } from "../design-system/Logo";
import { Divider } from "../design-system/Divider";
import { useSelector } from "react-redux";
import { notificationsSelectors } from "../store/notifications/selectors";
import { accountSelectors } from "../store/account/selectors";

const SidebarLayout = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  width: 240px;
  background: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.misc.cardShadow};
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[4]};
  padding: ${(p) => `${p.theme.space[5]} ${p.theme.space[3]}`};
  padding-bottom: env(safe-area-inset-bottom);
`;

const Badge = styled.div`
  background: ${(p) => p.theme.colors.blue10};
  color: ${(p) => p.theme.colors.blue70};
  font-size: ${(p) => p.theme.fontSizes[0]};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  padding: ${(p) => p.theme.space[0]} ${(p) => p.theme.space[1]};
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: ${(p) => p.theme.space[4]};
  transition: background-color 250ms ease-in-out;
`;

const NavigationItem = styled(NavLink)`
  display: grid;
  grid-template-columns: 24px 1fr max-content;
  grid-gap: ${(p) => p.theme.space[1]};
  align-items: center;
  text-decoration: none;
  padding: ${(p) => `${p.theme.space[1]} ${p.theme.space[2]}`};
  margin-left: ${(p) => `-${p.theme.space[1]}`};
  margin-right: ${(p) => `-${p.theme.space[1]}`};
  border-radius: 24px;
  transition: background-color 250ms ease-in-out;

  &:hover {
    background-color: ${(p) => p.theme.colors.gray10};

    ${Badge} {
      background: ${(p) => p.theme.colors.white};
    }
  }

  & :nth-child(1) {
    color: ${(p) => p.theme.colors.gray40};
  }
  & :nth-child(2) {
    color: ${(p) => p.theme.colors.gray70};
  }

  &.active {
    background-color: ${(p) => p.theme.colors.blue10};

    & :nth-child(1) {
      color: ${(p) => p.theme.colors.blue60};
    }
    & :nth-child(2) {
      color: ${(p) => p.theme.colors.blue70};
      font-weight: ${(p) => p.theme.fontWeights.bold};
    }

    ${Badge} {
      background: ${(p) => p.theme.colors.white};
    }
  }

  & + & {
    margin-top: ${(p) => p.theme.space[2]};
  }
`;

const ItemText = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const PatientPicker = styled.div`
  display: grid;
  grid-template-columns: 24px 1fr max-content;
  grid-gap: ${(p) => p.theme.space[1]};
  align-items: center;
  text-decoration: none;
  padding: ${(p) => `${p.theme.space[1]} ${p.theme.space[2]}`};
  margin-left: ${(p) => `-${p.theme.space[1]}`};
  margin-right: ${(p) => `-${p.theme.space[1]}`};
  border-radius: 24px;
  transition: background-color 250ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${(p) => p.theme.colors.gray10};
  }
`;

const Avatar = styled.div`
  background: ${(p) => p.theme.colors.purple50};
  color: ${(p) => p.theme.colors.white};
  font-size: ${(p) => p.theme.fontSizes[0]};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  width: ${(p) => p.theme.space[4]};
  height: ${(p) => p.theme.space[4]};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: ${(p) => p.theme.space[4]};
`;

export function Sidebar() {
  const patient = useSelector(accountSelectors.activePatient);
  const unreadNotificationsCount = useSelector(
    notificationsSelectors.unreadCount
  );

  return (
    <SidebarLayout>
      <Wrapper>
        <NavLink to="/medication">
          <Logo />
        </NavLink>
        <Divider />
        <PatientPicker>
          <Avatar>
            {patient.firstName.charAt(0).toUpperCase()}
            {patient.lastName.charAt(0).toUpperCase()}
          </Avatar>
          <ItemText>
            {patient.firstName} {patient.lastName}
          </ItemText>
          <Icon color="gray40">expand_more</Icon>
        </PatientPicker>
        <Divider />
        <div>
          <NavigationItem to="/medication">
            <Icon>med_capsule</Icon>
            <ItemText>Medication</ItemText>
          </NavigationItem>
          <NavigationItem to="/notifications">
            <Icon>notifications</Icon>
            <ItemText>Notifications</ItemText>
            {unreadNotificationsCount > 0 ? (
              <Badge>{unreadNotificationsCount}</Badge>
            ) : null}
          </NavigationItem>
          <NavigationItem to="/help">
            <Icon>headset_mic</Icon>
            <ItemText>Help</ItemText>
          </NavigationItem>
          <NavigationItem to="/settings">
            <Icon>account_circle</Icon>
            <ItemText>Account</ItemText>
          </NavigationItem>
        </div>
      </Wrapper>
    </SidebarLayout>
  );
}
