import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Icon } from "../design-system/Icon";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { BulletList } from "../design-system/BulletList";
import {
  FlowNavigationBar,
  FlowNavigationBarRightAction,
} from "../components/FlowNavigationBar";
import { Divider } from "../design-system/Divider";
import { PageTitle } from "../components/PageTitle";

export function RequestPrescriptionSuccess() {
  const history = useHistory();

  const onDonePress = () => {
    history.push("/medication");
  };

  return (
    <>
      <FlowNavigationBar
        title="Request a prescription"
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
          <Heading size={4}>We have your request</Heading>
          <BulletList>
            <li>
              <Text>
                We’ll send it to your GP within an hour (Monday to Friday, 9am
                to 5:30pm).
              </Text>
            </li>
            <li>
              <Text>
                We'll get a prescription back from your GP. This usually takes
                one to two working days.
              </Text>
            </li>
            <li>
              <Text>
                Our pharmacists will check your prescribed medication and post
                it out to you.
              </Text>
            </li>
          </BulletList>
          <Divider mt={3} mb={3} />
          <Button onClick={onDonePress} fillType="full-width">
            Okay, got it
          </Button>
        </Card>
      </PageContents>
    </>
  );
}
