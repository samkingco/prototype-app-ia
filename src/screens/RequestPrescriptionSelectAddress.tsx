import React from "react";
import { useHistory } from "react-router-dom";
import { Card } from "../design-system/Card";
import { Heading } from "../design-system/Heading";
import { PageContents } from "../design-system/PageContents";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { useSelector, useDispatch } from "react-redux";
import { List } from "../design-system/List";
import { setSelectedAddressForTempRequest } from "../store/requests/slice";
import { accountSelectors } from "../store/account/selectors";
import { Radio } from "../design-system/Radio";
import { ListItem } from "../design-system/ListItem";
import { Tag } from "../design-system/Tag";
import { requestSelectors } from "../store/requests/selectors";
import {
  FlowNavigationBar,
  FlowNavigationBarBackAction,
} from "../components/FlowNavigationBar";
import { FlowLayout } from "../components/FlowLayout";
import { PageTitle } from "../components/PageTitle";

export function RequestPrescriptionSelectAddress() {
  const history = useHistory();
  const dispatch = useDispatch();
  const tempRequest = useSelector(requestSelectors.getTempRequest);

  const deliveryAddresses = useSelector((s) =>
    accountSelectors.listDeliveryAddresses(s)
  );

  return (
    <>
      <FlowNavigationBar
        title=" "
        leftAction={<FlowNavigationBarBackAction label="Choose medication" />}
      />
      <PageContents>
        <PageTitle title="Choose delivery address" />
        <FlowLayout
          main={
            <>
              <Card>
                <Heading>Address book</Heading>
                <List>
                  {deliveryAddresses.map((address) => (
                    <Radio
                      key={`address_${address.id}`}
                      name="address"
                      checked={tempRequest.deliveryAddressId === address.id}
                      onChange={() => {
                        dispatch(setSelectedAddressForTempRequest(address.id));
                      }}
                      labelComponent={
                        <List gap={0}>
                          <ListItem
                            isCompact={true}
                            title={`${address.line1}${
                              address.line2 ? `, ${address.line2}` : ""
                            },`}
                            subtitle={`${address.city}, ${address.postcode}`}
                            additionalContent={
                              address.isDefault ? (
                                <div>
                                  <Tag>Default address</Tag>
                                </div>
                              ) : null
                            }
                          />
                        </List>
                      }
                    />
                  ))}
                </List>
                <List>
                  <ListItem
                    to="/request-prescription/add-delivery-address"
                    linkType="modal"
                    title="Add delivery address"
                  />
                  <ListItem
                    to="/request-prescription/add-collection-point"
                    linkType="modal"
                    title="Add collection point"
                  />
                </List>
              </Card>

              <Card>
                <List gap={2}>
                  <Text isBold={true}>How is my medication delivered?</Text>
                  <Text>
                    We use Royal Mail 48 hour tracked delivery. You will not
                    need to sign for it.
                  </Text>
                  <Text>
                    If your medication needs to be kept cold, we'll use 24 hour
                    tracked delivery.
                  </Text>
                </List>
              </Card>
            </>
          }
          aside={
            <Card>
              <Button
                fillType="full-width"
                onClick={() =>
                  history.push("/request-prescription/select-payment")
                }
              >
                Confirm delivery address
              </Button>
            </Card>
          }
        />
      </PageContents>
    </>
  );
}
