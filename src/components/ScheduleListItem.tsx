import React from "react";
import { ListItem } from "../design-system/ListItem";
import { Text } from "../design-system/Text";
import { List } from "../design-system/List";

export interface ScheduleItemType {
  timeOfDay: string;
  title: string;
  subtitle?: string;
  hasTaken?: boolean;
}

interface ScheduleListItemProps extends ScheduleItemType {
  className?: string;
  onClick?: () => void;
}

export function ScheduleListItem(props: ScheduleListItemProps) {
  return (
    <ListItem
      className={props.className}
      onClick={props.onClick}
      iconRight={props.hasTaken ? "done" : undefined}
    >
      <List gap={0}>
        <Text color="gray70">{props.timeOfDay}</Text>
        <Text>{props.title}</Text>
        <Text color="gray70">{props.subtitle}</Text>
      </List>
    </ListItem>
  );
}
