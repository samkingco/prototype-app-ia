import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, addDays } from "date-fns";
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
import { Heading } from "../design-system/Heading";
import { InputGroup } from "../design-system/InputGroup";
import { setChosenAction, markAsDone } from "../store/notifications/slice";
import { ActionableNotificationLayout } from "./ActionableNotificationLayout";

interface Props {
  notification: ComputedNotification;
}

interface Action {
  label: string;
  value: string;
}

export function NotificationTypeStockUpdate(props: Props) {
  const { notification } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const actions: Action[] = [
    {
      label: "Send each medication as soon as it’s available",
      value: "send-available",
    },
    {
      label: "Wait and send all my medication together",
      value: "wait",
    },
    {
      label: "Send me a prescription barcode I can use at a different pharmacy",
      value: "return-rx",
    },
  ];

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

  let actionUrl: string;

  if (
    notification.chosenAction &&
    notification.chosenAction === "send-available"
  ) {
    actionUrl = "/request-partial";
  }
  if (notification.chosenAction && notification.chosenAction === "return-rx") {
    actionUrl = "/return-rx";
  }

  return (
    <ActionableNotificationLayout
      notification={notification}
      doneContent={
        <>
          <Text>
            You chose{" "}
            <Text isInline={true} isBold={true}>
              “
              {
                actions.find((i) => i.value === notification.chosenAction)
                  ?.label
              }
              ”
            </Text>
            .
          </Text>
        </>
      }
      originalContent={
        <>
          <List gap={2}>
            <Text>{`Hi${patient ? ` ${patient.firstName}` : ""},`}</Text>
            <Text>
              We’re sorry, but we’re having trouble getting some of your
              medication from our supplier.
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
                      <>
                        <div />
                        <div>
                          {request && request.estimatedBackInStockDate ? (
                            <Tag variant="warning">
                              Estimated back in stock{" "}
                              {format(
                                request.estimatedBackInStockDate,
                                "dd MMM"
                              )}
                            </Tag>
                          ) : (
                            <Tag variant="error">Currently unavailable</Tag>
                          )}
                        </div>
                      </>
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
              {!notification.hasBeenDone ? (
                <>
                  <Divider />
                  <Heading>What would you like to do?</Heading>
                  <InputGroup
                    selectionMode="single"
                    items={actions.map((action) => ({
                      key: `action_${action.value}`,
                      name: "actions",
                      checked: Boolean(
                        notification.chosenAction === action.value
                      ),
                      onChange: () => {
                        dispatch(
                          setChosenAction(notification.id, action.value)
                        );
                      },
                      labelText: action.label,
                    }))}
                  />
                  <Button
                    isDisabled={
                      !notification.chosenAction || notification.hasBeenDone
                    }
                    variant="primary"
                    onClick={() => {
                      if (actionUrl) {
                        history.push(actionUrl);
                      }
                      if (notification.chosenAction !== "send-available") {
                        dispatch(markAsDone(notification.id));
                      }
                    }}
                  >
                    Confirm choice
                  </Button>
                </>
              ) : null}
            </>
          ) : null}
        </>
      }
    />
  );
}
