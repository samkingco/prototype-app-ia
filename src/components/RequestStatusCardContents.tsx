import React from "react";
import { format, addDays } from "date-fns";
import { Heading } from "../design-system/Heading";
import { Text } from "../design-system/Text";
import { Divider } from "../design-system/Divider";
import { ComputedRequest } from "../store/requests/selectors";
import { Button } from "../design-system/Button";
import { List } from "../design-system/List";
import { useHistory } from "react-router-dom";
import { ListItem } from "../design-system/ListItem";

interface Props {
  request?: ComputedRequest;
  medicationId: string;
}

export function RequestStatusCardContents(props: Props) {
  const history = useHistory();
  const { request, medicationId } = props;

  if (!request) {
    return null;
  }

  const isInStock = request.medicationStockStatus[medicationId] === "in_stock";

  if (request.status === "cancelled") {
    return (
      <>
        <Heading>Request cancelled</Heading>
        <Text>
          Your most recent request was cancelled. If this is unexpected, you may
          need to talk to your GP before they can issue a new prescription.
        </Text>
      </>
    );
  }

  if (request.status === "not_sent") {
    return (
      <>
        <Heading>Recently requested</Heading>
        <Text>
          We’re getting your request ready to send to your GP for approval.
        </Text>
      </>
    );
  }

  if (request.status === "awaiting_rx") {
    return (
      <>
        <Heading>Waiting for a prescription</Heading>
        <Text>
          We’ve sent the request to your GP, and we’re waiting to hear back from
          them.
        </Text>
      </>
    );
  }

  if (request.status === "awaiting_payment") {
    return (
      <>
        <Heading>Waiting for payment</Heading>
        <Text>
          We have a prescription for this medication, but we can’t start
          processing it until it’s been paid for.
        </Text>
        <Button onClick={() => history.push("/pay")}>Pay now</Button>
        <Divider />
        <List gap={1}>
          <Text isBold={true}>Don’t pay for prescriptions?</Text>
          <Text>
            Add an exemption or pre-payment certificate to Echo, and then we can
            process your prescription.
          </Text>
        </List>
        <Button
          variant="secondary"
          onClick={() => history.push("/add-exemption")}
        >
          Add exemption
        </Button>
      </>
    );
  }

  if (request.status === "awaiting_stock") {
    if (isInStock) {
      return (
        <>
          <Heading>Waiting on other medication</Heading>
          <Text>
            We’re waiting for all the medication on your prescription to be
            available before we send this out to you.
          </Text>
          <Divider />
          <List gap={1}>
            <Text isBold={true}>Need it sooner?</Text>
            <Text>
              If you prefer, we can send your available medication now instead
              of waiting on the rest.
            </Text>
          </List>
          <Button
            variant="secondary"
            onClick={() => history.push("/request-partial")}
          >
            Send available items
          </Button>
        </>
      );
    }
    return (
      <>
        <Heading>Currently unavailable</Heading>
        <Text>
          We’ll send this medication as soon as we get more from our suppliers.
        </Text>
        <Divider />
        {request.hasBeenSplit ? (
          <List gap={1}>
            <Text isBold={true}>Need it sooner?</Text>
            <Text>
              If you need this medication urgently, please contact our Patient
              Care team.
            </Text>
            <ListItem
              linkType="modal"
              title="Contact Patient Care"
              to="/contact-patient-care"
            />
          </List>
        ) : (
          <>
            <List gap={1}>
              <Text isBold={true}>Need it sooner?</Text>
              <Text>
                We can return your prescription to the NHS so you can collect
                your medication from a different pharmacy.
              </Text>
            </List>
            <Button
              variant="secondary"
              onClick={() => history.push("/collect-locally")}
            >
              Return this prescription
            </Button>
          </>
        )}
      </>
    );
  }

  if (request.status === "preparing") {
    return (
      <>
        <Heading>Final checks and packaging</Heading>
        <Text>
          Our pharmacists are checking over your medication and getting it ready
          to send.
        </Text>
      </>
    );
  }

  if (request.status === "dispatched") {
    return (
      <>
        <Heading>It’s on it’s way</Heading>
        <Text>
          We sent your medication on{" "}
          {format(request.lastStatusChange, "EEEE d MMM")}. It should be with
          you by {format(addDays(request.lastStatusChange, 2), "EEEE d MMM")}.
        </Text>
        <Button onClick={() => history.push("/track-delivery")}>
          Track delivery
        </Button>
      </>
    );
  }

  if (request.status === "delivered") {
    return (
      <>
        <Heading>Delivered</Heading>
        <Text>
          Your medication was delivered on the{" "}
          {format(request.lastStatusChange, "do 'of' MMM")}.
        </Text>
      </>
    );
  }

  return null;
}
