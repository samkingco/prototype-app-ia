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
  updateLastRequestBackInStockDate,
} from "../store/requests/slice";
import {
  FlowNavigationBar,
  FlowNavigationBarBackAction,
} from "../components/FlowNavigationBar";
import { FlowLayout } from "../components/FlowLayout";
import { PageTitle } from "../components/PageTitle";
import { addStockNotification } from "../store/notifications/slice";
import { addDays } from "date-fns";

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
      <FlowNavigationBar
        title=" "
        leftAction={
          <FlowNavigationBarBackAction label="Choose payment method" />
        }
      />
      <PageContents>
        <PageTitle title="Review your request" />
        <FlowLayout
          main={
            <>
              <Card>
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
                <Card>
                  <Heading>Delivery</Heading>
                  <FormattedAddress address={deliveryAddress} />
                  <ListItem
                    to="/request-prescription/select-address"
                    linkType="modal"
                    title="Change delivery address"
                  />
                </Card>
              ) : null}

              {paymentMethod ? (
                <Card>
                  <Heading>Payment</Heading>
                  <Text>
                    {paymentMethod.type} ending in{" "}
                    <Text isBold={true} isInline={true}>
                      {paymentMethod.cardNumber}
                    </Text>
                  </Text>
                  <ListItem
                    to="/request-prescription/select-payment"
                    linkType="modal"
                    title="Change payment method"
                  />
                </Card>
              ) : null}
            </>
          }
          aside={
            <Card>
              <Button
                fillType="full-width"
                onClick={() => {
                  dispatch(sendTempRequest());
                  if (medications.length > 1) {
                    // setTimeout(() => {
                    dispatch(updateLastRequestStatus("awaiting_stock"));
                    dispatch(
                      updateLastRequestBackInStockDate(
                        addDays(Date.now(), 4).getTime()
                      )
                    );
                    dispatch(addStockNotification());
                    // }, 10000);
                  }
                  history.push("/request-prescription/success");
                }}
              >
                Finish request
              </Button>
            </Card>
          }
        />
      </PageContents>
    </>
  );
}
