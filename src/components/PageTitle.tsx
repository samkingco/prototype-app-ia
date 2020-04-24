import React from "react";
import styled from "../design-system/styled";
import { Heading } from "../design-system/Heading";
import { Text } from "../design-system/Text";
import { Icon } from "../design-system/Icon";
import { useHistory } from "react-router-dom";

const ActionWrapper = styled.div`
  display: grid;
  grid-gap: ${(p) => p.theme.space[0]};
  grid-template-columns: max-content max-content;
  cursor: pointer;
`;

interface PageTitleActionProps {
  label?: string;
  icon?: string;
  onClick?: () => void;
}

export function PageTitleBackAction(props: PageTitleActionProps) {
  const history = useHistory();
  return (
    <ActionWrapper onClick={() => history.goBack()} {...props}>
      <Icon color="blue60">arrow_back</Icon>
      <Text color="blue70" isBold={true}>
        {props.label || "Back"}
      </Text>
    </ActionWrapper>
  );
}

export function PageTitleLeftAction(props: PageTitleActionProps) {
  return (
    <ActionWrapper {...props}>
      <Icon color="blue60">{props.icon}</Icon>
      <Text color="blue70" isBold={true}>
        {props.label}
      </Text>
    </ActionWrapper>
  );
}

export function PageTitleRightAction(props: PageTitleActionProps) {
  return (
    <ActionWrapper {...props}>
      <Text color="blue70" isBold={true}>
        {props.label}
      </Text>
      <Icon color="blue60">{props.icon}</Icon>
    </ActionWrapper>
  );
}

const Wrapper = styled.div`
  padding-top: ${(p) => p.theme.space[4]};
  padding-bottom: ${(p) => p.theme.space[2]};
`;

const TitleWrapper = styled.div`
  margin-top: ${(p) => p.theme.space[2]};
`;

interface PageTitleProps {
  className?: string;
  title: string;
  subtitle?: string;
  useXLargeTitle?: boolean;
  leftAction?: React.ReactNode;
}

const DefaultLeftAction = styled.div`
  display: flex;
  flex-basis: 25%;
  text-align: left;
`;

export function PageTitle(props: PageTitleProps) {
  return (
    <Wrapper className={props.className}>
      <DefaultLeftAction>
        {props.leftAction ? props.leftAction : null}
      </DefaultLeftAction>
      <TitleWrapper>
        <Heading size={props.useXLargeTitle ? 5 : 4}>{props.title}</Heading>
        {props.subtitle ? <Text>{props.subtitle}</Text> : null}
      </TitleWrapper>
    </Wrapper>
  );
}
