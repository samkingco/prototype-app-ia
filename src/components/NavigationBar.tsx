import React from "react";
import { useViewportScroll, motion, useTransform } from "framer-motion";
import styled from "../design-system/styled";
import { Heading } from "../design-system/Heading";
import { Text } from "../design-system/Text";
import { Icon } from "../design-system/Icon";
import { useHistory } from "react-router-dom";

const ActionWrapper = styled.div`
  display: grid;
  grid-gap: ${(p) => p.theme.space[1]};
  grid-template-columns: min-content min-content;
  cursor: pointer;
`;

interface NavigationBarActionProps {
  label?: string;
  icon?: string;
  onClick?: () => void;
}

export function NavigationBarBackAction(props: NavigationBarActionProps) {
  const history = useHistory();
  return (
    <ActionWrapper onClick={() => history.goBack()} {...props}>
      <Icon color="blue60">arrow_back</Icon>
      <Text color="blue70">Back</Text>
    </ActionWrapper>
  );
}

export function NavigationBarModalCloseAction(props: NavigationBarActionProps) {
  const history = useHistory();
  return (
    <ActionWrapper onClick={() => history.goBack()} {...props}>
      <Icon color="blue60">close</Icon>
    </ActionWrapper>
  );
}

export function NavigationBarLeftAction(props: NavigationBarActionProps) {
  return (
    <ActionWrapper {...props}>
      <Icon color="blue60">{props.icon}</Icon>
      <Text color="blue70">{props.label}</Text>
    </ActionWrapper>
  );
}

export function NavigationBarRightAction(props: NavigationBarActionProps) {
  return (
    <ActionWrapper {...props}>
      <Text color="blue70">{props.label}</Text>
      <Icon color="blue60">{props.icon}</Icon>
    </ActionWrapper>
  );
}

const Wrapper = styled(motion.div)`
  /* Height of the default nav bar */
  padding-top: 48px;
`;

interface NavigationBarProps {
  className?: string;
  title: string;
  subtitle?: string;
  useLargeTitle?: boolean;
  useXLargeTitle?: boolean;
  leftAction?: React.ReactNode;
  rightAction?: React.ReactNode;
}

const DefaultRowWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;

const DefaultRow = styled(motion.div)`
  display: flex;
  padding: ${(p) => `${p.theme.space[3]}`};
  min-height: 24px;
`;

const DefaultLeftAction = styled.div`
  display: flex;
  width: 25%;
  text-align: left;
`;
const DefaultTitle = styled(motion.div)`
  display: flex;
  width: 50%;
  text-align: center;
  justify-content: center;
`;
const DefaultTitleText = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
`;
const DefaultRightAction = styled.div`
  display: flex;
  width: 25%;
  text-align: right;
  justify-content: flex-end;
`;

const LargeTitleRowWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
  top: 0;
`;
const LargeTitleRow = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[2]};
  padding: ${(p) =>
    `${p.theme.space[2]} ${p.theme.space[4]} ${p.theme.space[4]}`};
`;

export function NavigationBar(props: NavigationBarProps) {
  const { scrollY } = useViewportScroll();
  const scrollAnimationRange = [0, 80];

  const defaultTitleOpacity = useTransform(scrollY, scrollAnimationRange, [
    props.useLargeTitle || props.useXLargeTitle ? 0 : 1,
    1,
  ]);

  const defaultRowBackground = useTransform(scrollY, scrollAnimationRange, [
    "rgba(255,255,255,0)",
    "rgba(255,255,255,1)",
  ]);

  const defaultRowShadow = useTransform(scrollY, scrollAnimationRange, [
    "0 1px 0 0 rgba(0,0,0,0)",
    "0 1px 0 0 rgba(0,0,0,0.12)",
  ]);

  const largeTitleOpacity = useTransform(scrollY, scrollAnimationRange, [1, 0]);

  return (
    <Wrapper className={props.className}>
      <DefaultRowWrapper>
        <DefaultRow
          style={{
            background: defaultRowBackground,
            boxShadow: defaultRowShadow,
          }}
        >
          <DefaultLeftAction>
            {props.leftAction ? props.leftAction : null}
          </DefaultLeftAction>
          <DefaultTitle style={{ opacity: defaultTitleOpacity }}>
            <DefaultTitleText isBold={true} isInline={true}>
              {props.title}
            </DefaultTitleText>
          </DefaultTitle>
          <DefaultRightAction>
            {props.rightAction ? props.rightAction : null}
          </DefaultRightAction>
        </DefaultRow>
      </DefaultRowWrapper>

      {props.useLargeTitle || props.useXLargeTitle ? (
        <LargeTitleRowWrapper style={{ opacity: largeTitleOpacity }}>
          <LargeTitleRow>
            <Heading size={props.useXLargeTitle ? 5 : 4}>{props.title}</Heading>
            {props.subtitle ? <Text>{props.subtitle}</Text> : null}
          </LargeTitleRow>
        </LargeTitleRowWrapper>
      ) : null}
    </Wrapper>
  );
}
