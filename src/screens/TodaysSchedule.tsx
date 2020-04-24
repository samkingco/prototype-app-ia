import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageContents } from "../design-system/PageContents";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { List } from "../design-system/List";
import { medicationSelectors } from "../store/medications/selectors";
import { takeDose } from "../store/medications/slice";
import { ListItem } from "../design-system/ListItem";
import { Text } from "../design-system/Text";
import { useRouteMatch } from "react-router-dom";
import {
  NavigationBar,
  NavigationBarBackAction,
} from "../components/NavigationBar";
import { MedicationListItem } from "../components/MedicationListItem";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { parse, format } from "date-fns";

export function TodaysSchedule() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const todaysFullSchedule = useSelector(
    medicationSelectors.todaysFullSchedule
  );

  const scheduleByTime = useSelector(
    medicationSelectors.todaysFullScheduleByTime
  );

  const onDosePress = (medicationId: string, timeOfDay: string) => {
    dispatch(takeDose(medicationId, timeOfDay));
  };

  return (
    <>
      <NavigationBar
        title="Today’s medication"
        useLargeTitle={true}
        leftAction={<NavigationBarBackAction label="Medication" />}
      />
      <PageContents>
        {scheduleByTime.length > 0 &&
          scheduleByTime.map(([timeOfDay, doses]) => (
            <Card>
              <Heading>
                Take at{" "}
                {format(
                  parse(timeOfDay, "H:mm", Date.now()),
                  "ha"
                ).toLowerCase()}
              </Heading>
              <List gap={2}>
                {doses.map((item) => (
                  <>
                    <Divider extendRight={true} />
                    <MedicationListItem
                      key={`${item.timeOfDay}_${item.medication.id}`}
                      medication={item.medication}
                      additionalContent={
                        <>
                          <div />
                          <List gap={3}>
                            <Text>{item.instruction}</Text>
                            {item.hasTaken ? (
                              <Button
                                isDisabled={true}
                                variant="gray"
                                fillType="min-content"
                                iconText="done"
                                iconColor="green50"
                                onClick={() => {}}
                              >
                                {item.takenTime}
                              </Button>
                            ) : (
                              <Button
                                variant="secondary"
                                fillType="min-content"
                                onClick={() =>
                                  onDosePress(item.medicationId, item.timeOfDay)
                                }
                              >
                                Mark as taken
                              </Button>
                            )}
                          </List>
                        </>
                      }
                    />
                  </>
                ))}
              </List>
            </Card>
          ))}

        <Card hasListItemAtStart={true} hasListItemAtEnd={true}>
          <ListItem
            title="View your full weekly schedule"
            iconRight="expand_more"
            linkType="modal"
            to={`${url}/weekly-schedule`}
          />
        </Card>
      </PageContents>
    </>
  );
}
