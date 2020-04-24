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
import { CurrentSupplyCard } from "../components/CurrentSupplyCard";
import { subDays, isAfter, format, parse } from "date-fns";
import { Divider } from "../design-system/Divider";
import {
  NavigationBar,
  NavigationBarBackAction,
} from "../components/NavigationBar";
import { RequestPrescriptionCard } from "../components/RequestPrescriptionCard";
import { Button } from "../design-system/Button";

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
    <>
      <NavigationBar
        title={medication.name}
        subtitle={medication.description}
        useLargeTitle={true}
        leftAction={<NavigationBarBackAction />}
      />
      <PageContents>
        {showRequestStatusCard ? (
          <Card hasListItemAtEnd={true}>
            <RequestStatusCardContents
              request={request}
              medicationId={medicationId}
            />
            <List>
              <Divider extendRight={true} />
              <ListItem
                linkType="modal"
                title="See request details"
                to={`${url}/request`}
              />
            </List>
          </Card>
        ) : null}

        <RequestPrescriptionCard
          hasRecentRequest={hasRecentRequest}
          medication={medication}
        />

        <CurrentSupplyCard medication={medication} />

        {medication.gpInstructions ? (
          <Card>
            <Heading>GP instructions</Heading>
            <Text>“{medication.gpInstructions}”</Text>
          </Card>
        ) : null}

        {medication.liveDoseSchedule ? (
          <Card hasListItemAtEnd={true}>
            <Heading>Today’s doses</Heading>
            <List gap={4}>
              {medication.liveDoseSchedule.map((item) => (
                <>
                  <Divider extendRight={true} />
                  <List gap={3} key={`dose_instruction_${item.timeOfDay}`}>
                    <div>
                      <Heading>
                        {format(
                          parse(item.timeOfDay, "H:mm", Date.now()),
                          "ha"
                        ).toLowerCase()}
                      </Heading>
                      <Text>{item.instruction}</Text>
                    </div>
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
                        onClick={() => onDosePress(item.timeOfDay)}
                      >
                        Mark as taken
                      </Button>
                    )}
                  </List>
                </>
              ))}
            </List>
            <List>
              <Divider extendRight={true} mb={1} />
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
        ) : null}

        <Card hasListItemAtStart={true} hasListItemAtEnd={true}>
          <ListItem
            to={`${url}/remove-medication`}
            linkType="destructive"
            title="Remove this medication"
            iconLeft="delete_outline"
          />
        </Card>
      </PageContents>
    </>
  );
}
