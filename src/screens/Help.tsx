import React from "react";
import { useRouteMatch } from "react-router-dom";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { Text } from "../design-system/Text";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { TabBar } from "../components/TabBar";
import { NavigationBar } from "../components/NavigationBar";

export function Help() {
  const { url } = useRouteMatch();

  return (
    <>
      <NavigationBar title="Help" useXLargeTitle={true} />
      <PageContents>
        <Card>
          <Text color="gray70" size={1}>
            Medication
          </Text>
          <List>
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="Where’s my medication?"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="I need my medication sooner"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="I want to cancel a request"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="I want to report a problem with medication I received"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="Change dosage, quantity, or brand"
            />
          </List>
        </Card>

        <Card>
          <Text color="gray70" size={1}>
            Payment
          </Text>
          <List>
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="I'm having trouble paying for a prescription"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="I don’t pay for prescriptions"
            />
          </List>
        </Card>

        <Card>
          <Text color="gray70" size={1}>
            Account
          </Text>
          <List>
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="Update my details"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="Change my delivery address"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="Delete my account"
            />
          </List>
        </Card>

        <Card>
          <Text color="gray70" size={1}>
            Notifications
          </Text>
          <List>
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="Prescription request reminders are not working"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="Dose reminders are not working"
            />
            <ListItem
              to={`${url}/article`}
              linkType="push"
              title="I want to change my marketing preferences"
            />
          </List>
        </Card>

        <Card>
          <Text color="gray70" size={1}>
            Need more information?
          </Text>
          <List>
            <ListItem
              to={`${url}/article`}
              linkType="modal"
              title="Chat to our Patient Care team"
            />
          </List>
        </Card>
      </PageContents>
      <TabBar />
    </>
  );
}
