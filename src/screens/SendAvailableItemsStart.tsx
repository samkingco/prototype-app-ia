import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import {
  FlowNavigationBar,
  FlowNavigationBarModalCloseAction,
} from "../components/FlowNavigationBar";
import { PageTitle } from "../components/PageTitle";

export function SendAvailableItemsStart() {
  const history = useHistory();

  return (
    <>
      <FlowNavigationBar
        title="Send available items"
        rightAction={<FlowNavigationBarModalCloseAction />}
      />
      <PageContents maxWidth={500}>
        <PageTitle title="" />
        <Card>
          <Icon size={6} color="gray40">
            notifications
          </Icon>
          <Heading size={4}>Before you start</Heading>
          <Text>
            If we send your available medication now, you will not be able to
            collect the rest from a different pharmacy. This is because it’s all
            on the same prescription.
          </Text>
          <Divider mt={3} mb={3} />
          <Button
            fillType="full-width"
            onClick={() => history.push("/request-partial/review")}
          >
            I understand
          </Button>
        </Card>
      </PageContents>
    </>
  );
}
