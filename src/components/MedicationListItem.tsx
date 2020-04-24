import React from "react";
import pluralize from "pluralize";
import { formatDistanceToNow, subDays, isBefore } from "date-fns";
import { ListItem, ListItemProps } from "../design-system/ListItem";
import { Tag, TagProps } from "../design-system/Tag";
import { overflowString } from "../utils/overflow-string";
import {
  ComputedMedication,
  medicationSelectors,
} from "../store/medications/selectors";
import { useSelector } from "react-redux";

interface StatusTagProps {
  amountRemainingInDays?: number;
  status: ComputedMedication["latestRequestStatus"];
  lastUpdated?: ComputedMedication["latestRequestStatusChangeTime"];
  hasRequestInProgress?: boolean;
  hasLowSupply?: boolean;
  isOutOfStock?: boolean;
}

interface DaysRemainingTagProps {
  amountRemainingInDays?: number;
  variant?: TagProps["variant"];
}

function DaysRemainingTag({
  amountRemainingInDays,
  ...props
}: DaysRemainingTagProps) {
  return (
    <Tag {...props}>
      Runs out in {amountRemainingInDays}{" "}
      {pluralize("days", amountRemainingInDays)}
    </Tag>
  );
}

function StatusTag(props: StatusTagProps) {
  const {
    status,
    lastUpdated,
    amountRemainingInDays,
    hasRequestInProgress,
    hasLowSupply,
    isOutOfStock,
  } = props;

  if (!hasRequestInProgress && !amountRemainingInDays) {
    return <Tag>Current supply unknown</Tag>;
  }

  if (!hasRequestInProgress && hasLowSupply) {
    return (
      <DaysRemainingTag
        variant="warning"
        amountRemainingInDays={amountRemainingInDays}
      />
    );
  }

  if (status === "never_requested") {
    return amountRemainingInDays ? (
      <DaysRemainingTag amountRemainingInDays={amountRemainingInDays} />
    ) : (
      <Tag>Not requested yet</Tag>
    );
  }

  if (status === "cancelled") {
    return <Tag>Recently cancelled</Tag>;
  }

  if (status === "not_sent") {
    return <Tag>Recently requested</Tag>;
  }

  if (status === "awaiting_rx") {
    return <Tag>Waiting for prescription</Tag>;
  }

  if (status === "awaiting_payment") {
    return <Tag variant="error">Waiting for payment</Tag>;
  }

  if (status === "awaiting_stock") {
    if (isOutOfStock) {
      return <Tag variant="error">Currently unavailable</Tag>;
    } else {
      return <Tag variant="warning">Waiting on other medicaiton</Tag>;
    }
  }

  if (status === "preparing") {
    return <Tag>Preparing for delivery</Tag>;
  }

  if (status === "dispatched") {
    return (
      <Tag variant="success">
        Dispatched{" "}
        {lastUpdated
          ? formatDistanceToNow(lastUpdated, { addSuffix: true })
          : null}
      </Tag>
    );
  }

  if (status === "delivered") {
    const deliveredInLast7Days = Boolean(
      lastUpdated && isBefore(lastUpdated, subDays(Date.now(), 7))
    );
    if (deliveredInLast7Days && amountRemainingInDays) {
      // NOT within the last 7 days
      return <DaysRemainingTag amountRemainingInDays={amountRemainingInDays} />;
    }

    return (
      <Tag variant="success">
        Delivered{" "}
        {lastUpdated
          ? formatDistanceToNow(lastUpdated, { addSuffix: true })
          : null}
      </Tag>
    );
  }

  return null;
}

interface MedicationListItemProps extends ListItemProps {
  medication: ComputedMedication;
  showIcon?: boolean;
  showStatusTag?: boolean;
  isCompact?: boolean;
}
export function MedicationListItem({
  showIcon = true,
  ...props
}: MedicationListItemProps) {
  const { medication } = props;
  const formattedMedicaitonDescription = overflowString(
    medication.description,
    70
  );

  const hasRequestInProgress = useSelector((s) =>
    medicationSelectors.hasRequestInProgress(s, medication.id)
  );

  const hasLowSupply = useSelector((s) =>
    medicationSelectors.hasLowSupply(s, medication.id)
  );

  return (
    <ListItem
      iconLeft={showIcon ? `med_${medication.form}` : undefined}
      isCompact={props.isCompact}
      title={medication.name}
      subtitle={formattedMedicaitonDescription}
      additionalContent={
        props.showStatusTag ? (
          <div>
            <StatusTag
              amountRemainingInDays={medication.amountRemainingInDays}
              status={medication.latestRequestStatus}
              lastUpdated={medication.latestRequestStatusChangeTime}
              hasRequestInProgress={hasRequestInProgress}
              hasLowSupply={hasLowSupply}
              isOutOfStock={medication.isOutOfStock}
            />
          </div>
        ) : null
      }
      {...props}
    />
  );
}
