import React from "react";
import { useHistory } from "react-router-dom";
import { Heading } from "../design-system/Heading";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { BulletList } from "../design-system/BulletList";
import { NavigationBar } from "../components/NavigationBar";
import { InterstitialPage } from "../components/InterstitialPage";
import { ToolBar } from "../components/ToolBar";

export function RequestPrescriptionSuccess() {
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
        <Heading size={4}>We have your request</Heading>
        <BulletList>
          <li>
            <Text>
              We’ll send it to your GP within an hour (Monday to Friday, 9am to
              5:30pm).
            </Text>
          </li>
          <li>
            <Text>
              We'll get a prescription back from your GP. This usually takes one
              to two working days.
            </Text>
          </li>
          <li>
            <Text>
              Our pharmacists will check your prescribed medication and post it
              out to you.
            </Text>
          </li>
        </BulletList>
      </InterstitialPage>
      <ToolBar>
        <Button onClick={onDonePress} fillType="full-width">
          Okay, got it
        </Button>
      </ToolBar>
    </>
  );
}
