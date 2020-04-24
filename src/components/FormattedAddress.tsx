import React from "react";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Address } from "../store/account/fake-data";

interface FormattedAddressProps {
  address: Address;
}

export function FormattedAddress(props: FormattedAddressProps) {
  const { address } = props;

  return (
    <List gap={0}>
      {address.name ? <Text>{address.name}</Text> : null}
      <Text>{`${address.line1},${
        address.line2 ? ` ${address.line2},` : ""
      }`}</Text>
      <Text>{`${address.city}, ${address.postcode}`}</Text>
    </List>
  );
}
