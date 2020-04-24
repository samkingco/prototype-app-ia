import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { PageContents } from "../design-system/PageContents";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { Text } from "../design-system/Text";
import { takeDose } from "../store/medications/slice";
import { medicationSelectors } from "../store/medications/selectors";
import { requestSelectors } from "../store/requests/selectors";
import { RequestStatusCardContents } from "../components/RequestStatusCardContents";
import { CurrentSupplyCardContents } from "../components/CurrentSupplyCardContents";
import { subDays, isAfter } from "date-fns";
import { ScheduleListItem } from "../components/ScheduleListItem";
import { ScreenWithSidebar } from "../components/ScreenWithSidebar";
import { PageTitle, PageTitleBackAction } from "../components/PageTitle";
import { Divider } from "../design-system/Divider";

interface Params {
  medicationId: string;
}

export function MedicationDetail() {
  const dispatch = useDispatch();
  const { params, url } = useRouteMatch<Params>();
  const { medicationId } = params;
  const medication = useSelector((s) =>
    medicationSelectors.byId(s, medicationId)
  );
  const request = useSelector((s) =>
    requestSelectors.requestForMedication(s, medicationId)
  );

  const hasRecentRequest = Boolean(
    request &&
      request.lastStatusChange &&
      isAfter(request.lastStatusChange, subDays(Date.now(), 7))
  );

  const showRequestStatusCard =
    (request && request.status !== "delivered") ||
    (request && request.status === "delivered" && hasRecentRequest);

  if (!medication) {
    return null;
  }

  const onDosePress = (timeOfDay: string) => {
    dispatch(takeDose(medication.id, timeOfDay));
  };

  return (
    <ScreenWithSidebar>
      <PageContents>
        <PageTitle
          title={medication.name}
          subtitle={medication.description}
          leftAction={<PageTitleBackAction />}
        />
        {showRequestStatusCard ? (
          <Card>
            <RequestStatusCardContents
              request={request}
              medicationId={medicationId}
            />
            <Divider />
            <ListItem
              linkType="modal"
              title="More information"
              to={`${url}/request`}
            />
          </Card>
        ) : null}

        {hasRecentRequest && !medication.amountRemainingInDays ? null : (
          <Card>
            <CurrentSupplyCardContents
              hasRecentRequest={hasRecentRequest}
              {...medication}
            />
          </Card>
        )}

        <Card>
          <Heading>Today’s doses</Heading>
          {medication.gpInstructions ? (
            <div>
              <Text isBold={true}>GP instructions</Text>
              <Text>“{medication.gpInstructions}”</Text>
            </div>
          ) : null}
          {medication.liveDoseSchedule ? (
            <List>
              {medication.liveDoseSchedule.map((item) => (
                <ScheduleListItem
                  key={`dose_instruction_${item.timeOfDay}`}
                  timeOfDay={item.timeOfDay}
                  title={item.instruction}
                  subtitle={item.takenTime}
                  hasTaken={item.hasTaken}
                  onClick={() => onDosePress(item.timeOfDay)}
                />
              ))}
            </List>
          ) : (
            <Text>
              We’ll update this when we get your first prescription from your
              GP.
            </Text>
          )}
          <Divider />
          <List>
            {medication.liveDoseSchedule ? (
              <>
                <ListItem
                  to={`${url}/see-schedule`}
                  linkType="modal"
                  title="See weekly view"
                />
                <ListItem
                  to={`${url}/edit-reminders`}
                  linkType="modal"
                  title="Manage reminders"
                />
              </>
            ) : null}
            <ListItem
              to={`${url}/advice`}
              linkType="modal"
              title="Advice on taking your medication"
            />
          </List>
        </Card>

        <Card onlyHasList={true}>
          <ListItem
            to={`${url}/remove-medication`}
            linkType="destructive"
            title="Remove this medication"
            iconLeft="delete_outline"
          />
        </Card>
      </PageContents>
    </ScreenWithSidebar>
  );
}
