import React from "react";
import { useHistory } from "react-router-dom";
import { Heading } from "../design-system/Heading";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { NavigationBar } from "../components/NavigationBar";
import { InterstitialPage } from "../components/InterstitialPage";
import { ToolBar } from "../components/ToolBar";

export function SendAvailableItemsSuccess() {
  const history = useHistory();

  const onDonePress = () => {
    history.push("/medication");
  };

  return (
    <>
      <NavigationBar title="" />
      <InterstitialPage>
        <Icon size={6} color="green50">
          done
        </Icon>
        <Heading size={4}>All done!</Heading>
        <Text>
          We’ll send each medication as soon as it's available. You can do this
          whenever a medication is out of stock.
        </Text>
      </InterstitialPage>
      <ToolBar>
        <Button onClick={onDonePress} fillType="full-width">
          Okay, got it
        </Button>
      </ToolBar>
    </>
  );
}
