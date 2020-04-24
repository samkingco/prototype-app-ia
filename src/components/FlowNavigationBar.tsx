import React from "react";
import styled from "../design-system/styled";
import { Text } from "../design-system/Text";
import { Icon } from "../design-system/Icon";
import { useHistory } from "react-router-dom";

const ActionWrapper = styled.div`
  display: grid;
  grid-gap: ${(p) => p.theme.space[1]};
  grid-template-columns: max-content max-content;
  cursor: pointer;
`;

interface FlowNavigationBarActionProps {
  label?: string;
  icon?: string;
  onClick?: () => void;
}

export function FlowNavigationBarBackAction(
  props: FlowNavigationBarActionProps
) {
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

export function FlowNavigationBarModalCloseAction(
  props: FlowNavigationBarActionProps
) {
  const history = useHistory();
  return (
    <ActionWrapper onClick={() => history.goBack()} {...props}>
      <Icon color="blue60">close</Icon>
    </ActionWrapper>
  );
}

export function FlowNavigationBarLeftAction(
  props: FlowNavigationBarActionProps
) {
  return (
    <ActionWrapper {...props}>
      <Icon color="blue60">{props.icon}</Icon>
      <Text color="blue70" isBold={true}>
        {props.label}
      </Text>
    </ActionWrapper>
  );
}

export function FlowNavigationBarRightAction(
  props: FlowNavigationBarActionProps
) {
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
  padding: ${(p) => `${p.theme.space[4]} ${p.theme.space[3]}`};
  background: ${(p) => p.theme.colors.white};
  box-shadow: ${(p) => p.theme.misc.cardShadow};
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

interface FlowNavigationBarProps {
  className?: string;
  title: string;
  subtitle?: string;
  useLargeTitle?: boolean;
  useXLargeTitle?: boolean;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const DefaultRowWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const DefaultRow = styled.div`
  display: flex;
`;
const DefaultLeftAction = styled.div`
  display: flex;
  flex-shrink: 0;
  margin-right: ${(p) => p.theme.space[3]};
`;
const DefaultTitle = styled.div`
  display: flex;
  flex: 1;
`;
const DefaultRightAction = styled.div`
  display: flex;
  flex-shrink: 0;
  text-align: right;
  justify-content: flex-end;
`;

export function FlowNavigationBar(props: FlowNavigationBarProps) {
  return (
    <Wrapper className={props.className}>
      <DefaultRowWrapper>
        <DefaultRow>
          {props.leftAction ? (
            <DefaultLeftAction>{props.leftAction}</DefaultLeftAction>
          ) : null}
          <DefaultTitle>
            <Text isBold={true} isInline={true}>
              {props.title}
            </Text>
          </DefaultTitle>
          <DefaultRightAction>
            {props.rightAction ? props.rightAction : null}
          </DefaultRightAction>
        </DefaultRow>
      </DefaultRowWrapper>
    </Wrapper>
  );
}
