import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { accountSelectors } from "../store/account/selectors";
import { reset as resetAccount } from "../store/account/slice";
import { reset as resetMedications } from "../store/medications/slice";
import { reset as resetNotifications } from "../store/notifications/slice";
import { reset as resetRequests } from "../store/requests/slice";
import { NavigationBar } from "../components/NavigationBar";
import { TabBar } from "../components/TabBar";

export function Settings() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const dispatch = useDispatch();
  const account = useSelector((s) => accountSelectors.getAccount(s));

  return (
    <>
      <NavigationBar title="Account" useXLargeTitle={true} />
      <PageContents>
        <Card hasListItemAtEnd={true}>
          <Text color="gray70" size={1}>
            Patients on this account
          </Text>
          <List>
            {account.patients.map((patient) => (
              <ListItem
                key={`patient_${patient.id}`}
                to={`${url}/patient/${patient.id}`}
                linkType="push"
                title={`${patient.firstName} ${patient.lastName}`}
                subtitle={`NHS #${patient.nhsNumber}`}
                iconLeft="account_circle"
              />
            ))}
            <ListItem
              to={`${url}/add-patient`}
              linkType="push"
              title="Add a new patient"
              iconLeft="add"
            />
          </List>
        </Card>

        <Card hasListItemAtEnd={true}>
          <Text color="gray70" size={1}>
            Account settings
          </Text>
          <List>
            <ListItem
              to={`${url}/contact-details`}
              linkType="push"
              title="Contact details"
              iconLeft="email"
            />
            <ListItem
              to={`${url}/delivery`}
              linkType="push"
              title="Delivery addresses"
              iconLeft="local_shipping"
            />
            <ListItem
              to={`${url}/payment`}
              linkType="push"
              title="Saved cards"
              iconLeft="credit_card"
            />
            <ListItem
              to={`${url}/notifications`}
              linkType="push"
              title="Notifications"
              iconLeft="notifications"
            />
            <ListItem
              to={`${url}/security`}
              linkType="push"
              title="Security"
              iconLeft="lock"
            />
            <ListItem
              to={`${url}/security`}
              linkType="push"
              title="Log out"
              iconLeft="exit_to_app"
            />
          </List>
        </Card>

        <Card hasListItemAtEnd={true}>
          <Text color="gray70" size={1}>
            Legal
          </Text>
          <List>
            <ListItem
              to={`${url}/terms-conditions`}
              linkType="push"
              title="Terms and conditions"
            />
            <ListItem
              to={`${url}/privacy`}
              linkType="push"
              title="Privacy policy"
            />
            <ListItem
              to={`${url}/eps`}
              linkType="push"
              title="Understanding electronic prescriptions"
            />
            <ListItem to={`${url}/about`} linkType="push" title="About Echo" />
          </List>
        </Card>

        <Card hasListItemAtEnd={true}>
          <Text color="gray70" size={1}>
            Prototype
          </Text>
          <List>
            <ListItem
              title="Reload prototype"
              iconLeft="refresh"
              linkType="modal"
              onClick={() => {
                window.location.reload();
              }}
            />
            <ListItem
              title="Reset prototype state"
              iconLeft="undo"
              linkType="destructive"
              onClick={() => {
                const hasConfirmed = window.confirm(
                  "Are you sure you want to reset?"
                );
                if (hasConfirmed) {
                  dispatch(resetAccount());
                  dispatch(resetMedications());
                  dispatch(resetNotifications());
                  dispatch(resetRequests());
                  history.push("/");
                }
              }}
            />
          </List>
        </Card>
      </PageContents>
      <TabBar />
    </>
  );
}
