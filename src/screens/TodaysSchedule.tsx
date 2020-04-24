import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageContents } from "../design-system/PageContents";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { List } from "../design-system/List";
import { ScheduleListItem } from "../components/ScheduleListItem";
import { medicationSelectors } from "../store/medications/selectors";
import { takeDose } from "../store/medications/slice";
import { ListItem } from "../design-system/ListItem";
import { ScreenWithSidebar } from "../components/ScreenWithSidebar";
import { PageTitle, PageTitleBackAction } from "../components/PageTitle";
import { useRouteMatch } from "react-router-dom";

export function TodaysSchedule() {
  const dispatch = useDispatch();
  const { url } = useRouteMatch();

  const todaysFullSchedule = useSelector(
    medicationSelectors.todaysFullSchedule
  );

  const morningSchedule = todaysFullSchedule.filter(
    (i) => i.timeOfDay < "12:00"
  );
  const afternoonSchedule = todaysFullSchedule.filter(
    (i) => i.timeOfDay > "12:00" && i.timeOfDay < "18:00"
  );
  const eveningSchedule = todaysFullSchedule.filter(
    (i) => i.timeOfDay > "18:00"
  );

  const onDosePress = (medicationId: string, timeOfDay: string) => {
    dispatch(takeDose(medicationId, timeOfDay));
  };

  return (
    <ScreenWithSidebar>
      <PageContents>
        <PageTitle
          title="Today’s medication"
          leftAction={<PageTitleBackAction label="Medication" />}
        />
        {morningSchedule.length > 0 && (
          <Card>
            <Heading>Morning</Heading>
            <List>
              {morningSchedule.map((item) => (
                <ScheduleListItem
                  key={`${item.timeOfDay}_${item.medicationName}`}
                  timeOfDay={item.timeOfDay}
                  title={item.medicationName}
                  subtitle={item.hasTaken ? item.takenTime : item.instruction}
                  hasTaken={item.hasTaken}
                  onClick={() => onDosePress(item.medicationId, item.timeOfDay)}
                />
              ))}
            </List>
          </Card>
        )}
        {afternoonSchedule.length > 0 && (
          <Card>
            <Heading>Afternoon</Heading>
            <List>
              {afternoonSchedule.map((item) => (
                <ScheduleListItem
                  key={`${item.timeOfDay}_${item.medicationName}`}
                  timeOfDay={item.timeOfDay}
                  title={item.medicationName}
                  subtitle={item.hasTaken ? item.takenTime : item.instruction}
                  hasTaken={item.hasTaken}
                  onClick={() => onDosePress(item.medicationId, item.timeOfDay)}
                />
              ))}
            </List>
          </Card>
        )}
        {eveningSchedule.length > 0 && (
          <Card>
            <Heading>Evening</Heading>
            <List>
              {eveningSchedule.map((item) => (
                <ScheduleListItem
                  key={`${item.timeOfDay}_${item.medicationName}`}
                  timeOfDay={item.timeOfDay}
                  title={item.medicationName}
                  subtitle={item.hasTaken ? item.takenTime : item.instruction}
                  hasTaken={item.hasTaken}
                  onClick={() => onDosePress(item.medicationId, item.timeOfDay)}
                />
              ))}
            </List>
          </Card>
        )}

        <Card onlyHasList={true}>
          <ListItem
            title="View your full weekly schedule"
            iconRight="expand_more"
            linkType="modal"
            to={`${url}/weekly-schedule`}
          />
        </Card>
      </PageContents>
    </ScreenWithSidebar>
  );
}
