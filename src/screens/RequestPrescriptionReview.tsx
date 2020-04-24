import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { useSelector, useDispatch } from "react-redux";
import { List } from "../design-system/List";
import { accountSelectors } from "../store/account/selectors";
import { ListItem } from "../design-system/ListItem";
import { requestSelectors } from "../store/requests/selectors";
import { MedicationListItem } from "../components/MedicationListItem";
import { medicationSelectors } from "../store/medications/selectors";
import { FormattedAddress } from "../components/FormattedAddress";
import {
  sendTempRequest,
  updateLastRequestStatus,
} from "../store/requests/slice";
import { addStockNotification } from "../store/notifications/slice";
import {
  NavigationBar,
  NavigationBarBackAction,
} from "../components/NavigationBar";
import { ToolBar } from "../components/ToolBar";
import { Divider } from "../design-system/Divider";

export function RequestPrescriptionReview() {
  const history = useHistory();
  const dispatch = useDispatch();
  const tempRequest = useSelector(requestSelectors.getTempRequest);

  const medications = useSelector((s) =>
    medicationSelectors.byIds(s, tempRequest.medicationIds)
  );

  const deliveryAddress = useSelector((s) =>
    accountSelectors.getDeliveryAddress(s, tempRequest.deliveryAddressId)
  );

  const paymentMethod = useSelector((s) =>
    accountSelectors.getPaymentMethod(s, tempRequest.paymentMethodId)
  );

  return (
    <>
      <NavigationBar
        title="Review your request"
        useLargeTitle={true}
        leftAction={<NavigationBarBackAction label="Choose payment method" />}
      />
      <PageContents>
        <Card hasListItemAtEnd={true}>
          <Heading>Medication</Heading>
          <List>
            {medications.map((medication) => (
              <MedicationListItem
                key={`med_${medication.id}`}
                medication={medication}
              />
            ))}
          </List>
        </Card>

        {deliveryAddress ? (
          <Card hasListItemAtEnd={true}>
            <Heading>Delivery</Heading>
            <FormattedAddress address={deliveryAddress} />
            <List>
              <Divider extendRight={true} />
              <ListItem
                to="/request-prescription/select-address"
                linkType="modal"
                title="Change delivery address"
              />
            </List>
          </Card>
        ) : null}

        {paymentMethod ? (
          <Card hasListItemAtEnd={true}>
            <Heading>Payment</Heading>
            <Text>
              {paymentMethod.type} ending in{" "}
              <Text isBold={true} isInline={true}>
                {paymentMethod.cardNumber}
              </Text>
            </Text>
            <List>
              <Divider extendRight={true} />
              <ListItem
                to="/request-prescription/select-payment"
                linkType="modal"
                title="Change payment method"
              />
            </List>
          </Card>
        ) : null}
        <ToolBar>
          <Button
            fillType="full-width"
            onClick={() => {
              dispatch(sendTempRequest());
              if (medications.length > 1) {
                dispatch(updateLastRequestStatus("awaiting_stock"));
                dispatch(addStockNotification());
              }
              history.push("/request-prescription/success");
            }}
          >
            Finish request
          </Button>
        </ToolBar>
      </PageContents>
    </>
  );
}
