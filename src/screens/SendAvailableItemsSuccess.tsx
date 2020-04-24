import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import {
  FlowNavigationBar,
  FlowNavigationBarRightAction,
} from "../components/FlowNavigationBar";
import { Divider } from "../design-system/Divider";
import { PageTitle } from "../components/PageTitle";

export function SendAvailableItemsSuccess() {
  const history = useHistory();

  const onDonePress = () => {
    history.push("/medication");
  };

  return (
    <>
      <FlowNavigationBar
        title="Send available items"
        rightAction={
          <FlowNavigationBarRightAction label="Close" onClick={onDonePress} />
        }
      />
      <PageContents maxWidth={500}>
        <PageTitle title="" />
        <Card>
          <Icon size={6} color="green50">
            done
          </Icon>
          <Heading size={4}>All done!</Heading>
          <Text>
            We’ll send each medication as soon as it's available. You can do
            this whenever a medication is out of stock.
          </Text>
          <Divider mt={3} mb={3} />
          <Button onClick={onDonePress} fillType="full-width">
            Okay, got it
          </Button>
        </Card>
      </PageContents>
    </>
  );
}
