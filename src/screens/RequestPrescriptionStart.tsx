import React from "react";
import { useHistory } from "react-router-dom";
import { Heading } from "../design-system/Heading";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { BulletList } from "../design-system/BulletList";
import {
  NavigationBar,
  NavigationBarModalCloseAction,
} from "../components/NavigationBar";
import { ToolBar } from "../components/ToolBar";
import { InterstitialPage } from "../components/InterstitialPage";

export function RequestPrescriptionStart() {
  const history = useHistory();

  return (
    <>
      <NavigationBar title="" rightAction={<NavigationBarModalCloseAction />} />
      <InterstitialPage>
        <Icon size={6} color="gray40">
          notifications
        </Icon>
        <Heading size={4}>Your health comes first</Heading>
        <BulletList>
          <li>
            <Text>
              We always get your GP's approval before sending you medication.
              This ensures it’s safe.
            </Text>
          </li>
          <li>
            <Text>
              Our team of pharmacists will check your medication again before
              sending it out to you.
            </Text>
          </li>
        </BulletList>
      </InterstitialPage>
      <ToolBar>
        <Button
          fillType="full-width"
          onClick={() =>
            history.push("/request-prescription/select-medication")
          }
        >
          Okay, got it
        </Button>
      </ToolBar>
    </>
  );
}
