import React from "react";
import { useSelector } from "react-redux";
import { format, addDays } from "date-fns";
import { Card } from "../design-system/Card";
import { Text } from "../design-system/Text";
import { List } from "../design-system/List";
import { Divider } from "../design-system/Divider";
import { ComputedNotification } from "../store/notifications/selectors";
import { medicationSelectors } from "../store/medications/selectors";
import { accountSelectors } from "../store/account/selectors";
import { Tag } from "../design-system/Tag";
import { MedicationListItem } from "./MedicationListItem";
import { requestSelectors } from "../store/requests/selectors";
import { Button } from "../design-system/Button";
import { useHistory } from "react-router-dom";

interface Props {
  notification: ComputedNotification;
}

export function NotificationTypeStockUpdate(props: Props) {
  const { notification } = props;
  const history = useHistory();

  const request = useSelector((s) =>
    requestSelectors.byId(s, notification.requestId)
  );

  const outOfStockMedicationIds = request
    ? Object.keys(request.medicationStockStatus).reduce((ids: string[], id) => {
        if (request.medicationStockStatus[id] === "out_of_stock") {
          return [...ids, id];
        }
        return ids;
      }, [])
    : [];

  const inStockMedicationIds = request
    ? Object.keys(request.medicationStockStatus).reduce((ids: string[], id) => {
        if (request.medicationStockStatus[id] === "in_stock") {
          return [...ids, id];
        }
        return ids;
      }, [])
    : [];

  const outOfStockMedication = useSelector((s) =>
    medicationSelectors.byIds(s, outOfStockMedicationIds)
  );

  const inStockMedication = useSelector((s) =>
    medicationSelectors.byIds(s, inStockMedicationIds)
  );

  const patient = useSelector((s) =>
    accountSelectors.getPatient(s, notification.patientId)
  );

  return (
    <Card>
      <List gap={1}>
        <Text>{`Hi${patient ? ` ${patient.firstName}` : ""},`}</Text>
        <Text>
          We’re sorry, but we’re having trouble getting some of your medication
          from our supplier.
        </Text>
        {request && request.estimatedBackInStockDate ? (
          <Text>
            Your new estimated dispatch date is{" "}
            <Text isBold={true} isInline={true}>
              {format(
                addDays(request.estimatedBackInStockDate, 1),
                "do MMMM, yyyy"
              )}
              .
            </Text>
          </Text>
        ) : null}
      </List>
      {outOfStockMedication.length > 0 ? (
        <>
          <Divider />
          <Text isBold={true}>Unavailable items</Text>
          <List>
            {outOfStockMedication.map((medication) => (
              <MedicationListItem
                key={`medication_${medication.id}`}
                medication={medication}
                additionalContent={
                  <div>
                    {request && request.estimatedBackInStockDate ? (
                      <Tag variant="warning">
                        Estimated back in stock{" "}
                        {format(request.estimatedBackInStockDate, "dd MMM")}
                      </Tag>
                    ) : (
                      <Tag variant="error">Currently unavailable</Tag>
                    )}
                  </div>
                }
              />
            ))}
          </List>
        </>
      ) : null}
      {inStockMedication.length > 0 ? (
        <>
          <Divider />
          <Text isBold={true}>Available items</Text>
          <Text>
            We usually wait until all items on a prescription are in stock
            before sending them out.
          </Text>
          <List>
            {inStockMedication.map((medication) => (
              <MedicationListItem
                key={`medication_${medication.id}`}
                medication={medication}
              />
            ))}
          </List>
          <Divider />
          <List gap={1}>
            <Text isBold={true}>Need them sooner?</Text>
            <Text>
              If you prefer, we can send your available medication now instead
              of waiting on the rest.
            </Text>
          </List>
          <Button
            variant="primary"
            onClick={() => history.push("/request-partial")}
          >
            Send available items
          </Button>
        </>
      ) : null}
      <Divider mt={3} mb={3} />
      <Text>
        Best wishes,
        <br />
        Team Echo
      </Text>
    </Card>
  );
}
