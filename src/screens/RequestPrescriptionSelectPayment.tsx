import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { useSelector, useDispatch } from "react-redux";
import { Divider } from "../design-system/Divider";
import { List } from "../design-system/List";
import { setSelectedPaymentMethodForTempRequest } from "../store/requests/slice";
import { accountSelectors } from "../store/account/selectors";
import { Radio } from "../design-system/Radio";
import { ListItem } from "../design-system/ListItem";
import { Tag } from "../design-system/Tag";
import { requestSelectors } from "../store/requests/selectors";
import { FlowLayout } from "../components/FlowLayout";
import {
  FlowNavigationBar,
  FlowNavigationBarBackAction,
} from "../components/FlowNavigationBar";
import { PageTitle } from "../components/PageTitle";

export function RequestPrescriptionSelectPayment() {
  const history = useHistory();
  const dispatch = useDispatch();
  const tempRequest = useSelector(requestSelectors.getTempRequest);

  const paymentMethods = useSelector((s) =>
    accountSelectors.listPaymentMethods(s)
  );

  return (
    <>
      <FlowNavigationBar
        title=" "
        leftAction={
          <FlowNavigationBarBackAction label="Choose delivery address" />
        }
      />
      <PageContents>
        <PageTitle title="Choose payment method" />
        <FlowLayout
          main={
            <>
              <Card>
                <Heading>Saved cards</Heading>
                <List>
                  {paymentMethods.map((paymentMethod) => (
                    <Radio
                      key={`paymentMethod_${paymentMethod.id}`}
                      name="paymentMethod"
                      checked={tempRequest.paymentMethodId === paymentMethod.id}
                      onChange={() => {
                        dispatch(
                          setSelectedPaymentMethodForTempRequest(
                            paymentMethod.id
                          )
                        );
                      }}
                      labelComponent={
                        <ListItem
                          isCompact={true}
                          title={`${paymentMethod.type} ending in ${paymentMethod.cardNumber}`}
                          additionalContent={
                            paymentMethod.isDefault ? (
                              <div>
                                <Tag>Default payment method</Tag>
                              </div>
                            ) : null
                          }
                        />
                      }
                    />
                  ))}
                </List>
                <ListItem
                  to="/request-prescription/add-payment-method"
                  linkType="modal"
                  title="Add new card"
                />
              </Card>

              <Card>
                <Heading>Don’t pay for prescriptions?</Heading>
                <ListItem
                  to="/request-prescription/add-exemption"
                  linkType="modal"
                  title="Add exemption or prepayment certificate"
                />
              </Card>

              <Card>
                <List gap={2}>
                  <Text isBold={true}>How much will I pay?</Text>
                  <Text>
                    You’ll only pay the standard NHS charge of £9.15 for each
                    medication your GP prescribes. Nothing extra.
                  </Text>
                </List>
                <Divider />
                <List gap={2}>
                  <Text isBold={true}>When will I pay?</Text>
                  <Text>
                    We’ll take payment when we get a prescription from your GP.
                  </Text>
                </List>
              </Card>
            </>
          }
          aside={
            <Card>
              <Button
                fillType="full-width"
                onClick={() => history.push("/request-prescription/review")}
              >
                Confirm payment details
              </Button>
            </Card>
          }
        />
      </PageContents>
    </>
  );
}
