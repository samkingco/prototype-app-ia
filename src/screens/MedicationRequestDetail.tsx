import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { PageContents } from "../design-system/PageContents";
import { Card } from "../design-system/Card";
import { Divider } from "../design-system/Divider";
import { accountSelectors } from "../store/account/selectors";
import { medicationSelectors } from "../store/medications/selectors";
import { requestSelectors } from "../store/requests/selectors";
import { MedicationListItem } from "../components/MedicationListItem";
import { Heading } from "../design-system/Heading";
import { Text } from "../design-system/Text";
import { List } from "../design-system/List";
import { ListItem } from "../design-system/ListItem";
import { FormattedAddress } from "../components/FormattedAddress";
import {
  NavigationBar,
  NavigationBarBackAction,
} from "../components/NavigationBar";
import pluralize from "pluralize";

interface Params {
  medicationId: string;
}

export function MedicationRequestDetail() {
  const { params, url } = useRouteMatch<Params>();
  const { medicationId } = params;

  const medication = useSelector((s) =>
    medicationSelectors.byId(s, medicationId)
  );

  const request = useSelector((s) =>
    requestSelectors.requestForMedication(s, medicationId)
  );

  const otherRequestedMedication = useSelector((s) =>
    medicationSelectors.byIds(
      s,
      request && medication
        ? request.medicationIds.filter((id) => id !== medication.id)
        : []
    )
  );

  const deliveryAddress = useSelector((s) =>
    accountSelectors.getDeliveryAddress(
      s,
      request && request.deliveryAddressId ? request.deliveryAddressId : ""
    )
  );

  const hasPrescriptionStatuses = [
    "awaiting_payment",
    "awaiting_stock",
    "preparing",
    "dispatched",
    "delivered",
  ];
  const hasPrescription = Boolean(
    request && hasPrescriptionStatuses.includes(request.status)
  );

  const deliveryPreference = request && request.deliveryPreference;
  const isLetterboxFriendly = request && request.isLetterboxFriendly;

  const account = useSelector((s) => accountSelectors.getAccount(s));

  const gpSurgery = account.patients[0].gpSurgery;

  if (!medication) {
    return null;
  }

  return (
    <>
      <NavigationBar
        title="Request details"
        subtitle={`${medication.name} ${pluralize(medication.form, 2)}`}
        useLargeTitle={true}
        leftAction={<NavigationBarBackAction />}
      />
      <PageContents>
        {/* <Card>
          <RequestStatusCardContents
            request={request}
            medicationId={medicationId}
          />
        </Card> */}

        {otherRequestedMedication.length > 0 ? (
          <Card hasListItemAtEnd={true}>
            <Heading>
              {hasPrescription
                ? "On the same prescription"
                : "Related medication"}
            </Heading>
            <List>
              <Divider extendRight={true} />
              {otherRequestedMedication.map((medication) => (
                <MedicationListItem
                  key={`other_med_${medication.id}`}
                  medication={medication}
                  showStatusTag={hasPrescription}
                />
              ))}
            </List>
          </Card>
        ) : null}

        <Card>
          <Heading>Delivery</Heading>
          {deliveryAddress ? (
            <>
              <List gap={1}>
                <Text isBold={true}>Delivery address</Text>
                <FormattedAddress address={deliveryAddress} />
                <ListItem
                  title="Change delivery address"
                  to={`${url}/change-delivery-address`}
                  linkType="modal"
                />
                <Divider extendRight={true} />
              </List>
            </>
          ) : null}

          <List gap={1}>
            <Text isBold={true}>Delivery preference</Text>
            <Text>
              {deliveryPreference === "asap"
                ? "Send items as soon as they're available"
                : "Send all items together"}
            </Text>
            <ListItem
              title="Change delivery preference"
              to={`${url}/change-delivery-preference`}
              linkType="modal"
            />
            <Divider extendRight={true} />
          </List>

          {isLetterboxFriendly ? (
            <>
              <List gap={1}>
                <Text isBold={true}>
                  {isLetterboxFriendly
                    ? "Letterbox friendly"
                    : "Not letterbox friendly"}
                </Text>
                <Text>
                  Based on the size of this delivery, we think it will
                  {isLetterboxFriendly ? " " : " not "}fit through your
                  letterbox.
                </Text>
              </List>
            </>
          ) : null}
        </Card>

        <Card hasListItemAtEnd={true}>
          <Heading>GP surgery</Heading>
          <FormattedAddress address={gpSurgery} />
          {gpSurgery.phone ? (
            <List>
              <Divider extendRight={true} />
              <ListItem
                title="Call GP surgery"
                to={`${url}/call-gp`}
                linkType="modal"
              />
            </List>
          ) : null}
        </Card>

        <Card hasListItemAtStart={true} hasListItemAtEnd={true}>
          <ListItem
            title="Cancel this request"
            to={`${url}/cancel-request`}
            linkType="destructive"
            iconLeft="block"
          />
        </Card>
      </PageContents>
    </>
  );
}
