import React from "react";
import { format, isAfter, set } from "date-fns";
import { Heading } from "../design-system/Heading";
import { Text } from "../design-system/Text";
import { Divider } from "../design-system/Divider";
import { ComputedRequest } from "../store/requests/selectors";
import { Button } from "../design-system/Button";
import { List } from "../design-system/List";
import { useHistory } from "react-router-dom";
import { ListItem } from "../design-system/ListItem";
import { RequestTracker } from "./RequestTracker";

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
        <Heading>We’ve got your request</Heading>
        <RequestTracker currentStep={1} />
        <Text>We’re getting your request ready to send to your GP.</Text>
      </>
    );
  }

  if (request.status === "awaiting_rx") {
    return (
      <>
        <Heading>We’ve sent your request</Heading>
        <RequestTracker currentStep={2} />
        <Text>
          We’ve sent your request to your GP. We’re now waiting for a
          prescription from them.
        </Text>
      </>
    );
  }

  if (request.status === "awaiting_payment") {
    return (
      <>
        <Heading>Waiting for payment</Heading>
        <RequestTracker currentStep={3} isCurrentStepBlocked={true} />
        <Text>
          We have a prescription for this medication, but we can’t start
          processing it until it’s been paid for.
        </Text>
        <Button onClick={() => history.push("/pay")}>Pay now</Button>
        <Divider />
        <List>
          <Text isBold={true}>Don’t pay for prescriptions?</Text>
          <ListItem
            linkType="modal"
            title="Add exemption or prepayment certificate"
            to="/add-exemption"
          />
        </List>
      </>
    );
  }

  if (request.status === "awaiting_stock") {
    if (isInStock) {
      return (
        <>
          <Heading>Waiting on other medication</Heading>
          <RequestTracker currentStep={4} isCurrentStepBlocked={true} />
          <Text>
            We’re waiting for all the medication on your prescription to be
            available before we send this out to you.
          </Text>
          <List>
            <Text color="gray70">Estimated dispatch</Text>
            <Text isBold={true}>Unknown</Text>
          </List>
          <Divider />
          <List gap={2}>
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
          <Text>
            Or we can send you a prescription barcode. You can use this to
            collect your medication from any pharmacy.
          </Text>
          <Button
            variant="secondary"
            onClick={() => history.push("/return-prescription")}
          >
            Get prescription barcode
          </Button>
        </>
      );
    }
    return (
      <>
        <Heading>Currently unavailable</Heading>
        <Text>
          We’re having trouble getting this medicine from our suppliers.
        </Text>
        <Text>
          We’re not sure when it will be available, but we’ll send it as soon as
          we can.
        </Text>
        <List>
          <Text color="gray70">Estimated dispatch</Text>
          <Text isBold={true}>Unknown</Text>
        </List>
        <Divider />
        {request.hasBeenSplit ? (
          <List gap={2}>
            <Text isBold={true}>Need it urgently?</Text>
            <Text>
              If you need this medication urgently, please contact our support
              team.
            </Text>
            <ListItem
              linkType="modal"
              title="Contact Patient Care"
              to="/contact-patient-care"
            />
          </List>
        ) : (
          <>
            <List gap={2}>
              <Text isBold={true}>Need it soon?</Text>
              <Text>
                We can send you a prescription barcode. You can use this to
                collect your medication from any pharmacy.
              </Text>
            </List>
            <Button
              variant="secondary"
              onClick={() => history.push("/collect-locally")}
            >
              Get prescription barcode
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
        <RequestTracker currentStep={4} />
        <Text>
          Jumana is checking over your medication and getting it ready to send.
        </Text>
        <div>
          <Text color="gray70">Estimated dispatch</Text>
          <Text isBold={true}>
            {isAfter(
              Date.now(),
              set(Date.now(), {
                hours: 18,
                minutes: 0,
                seconds: 0,
                milliseconds: 0,
              })
            )
              ? "Tomorrow"
              : "Today"}
          </Text>
        </div>
      </>
    );
  }

  if (request.status === "dispatched") {
    return (
      <>
        <Heading>Your medication is on its way</Heading>
        <RequestTracker currentStep={5} />
        <Text>We've sent your medication using Royal Mail 48hr.</Text>
        <List>
          <Text color="gray70">Dispatched on</Text>
          <Text isBold={true}>
            {format(request.lastStatusChange, "EEEE d MMMM")}
          </Text>
          <ListItem
            linkType="modal"
            title="Track via Royal Mail"
            to="/track-delivery"
          />
        </List>
      </>
    );
  }

  if (request.status === "delivered") {
    return (
      <>
        <Heading>Delivered</Heading>
        <Text color="gray70">
          {format(request.lastStatusChange, "EEEE d MMMM")}
        </Text>
      </>
    );
  }

  return null;
}
