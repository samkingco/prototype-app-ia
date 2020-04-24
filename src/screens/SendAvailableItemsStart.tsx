import React from "react";
import { useHistory } from "react-router-dom";
import { Heading } from "../design-system/Heading";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { InterstitialPage } from "../components/InterstitialPage";
import { ToolBar } from "../components/ToolBar";
import {
  NavigationBar,
  NavigationBarModalCloseAction,
} from "../components/NavigationBar";

export function SendAvailableItemsStart() {
  const history = useHistory();

  return (
    <>
      <NavigationBar title="" rightAction={<NavigationBarModalCloseAction />} />
      <InterstitialPage>
        <Icon size={6} color="gray40">
          notifications
        </Icon>
        <Heading size={4}>Before you start</Heading>
        <Text>
          If we send your available medication now, you will not be able to
          collect the rest from a different pharmacy. This is because it’s all
          on the same prescription.
        </Text>
      </InterstitialPage>
      <ToolBar>
        <Button
          fillType="full-width"
          onClick={() => history.push("/request-partial/review")}
        >
          I understand
        </Button>
      </ToolBar>
    </>
  );
}
