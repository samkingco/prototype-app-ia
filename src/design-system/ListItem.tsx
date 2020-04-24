import React from "react";
import styled, { css } from "./styled";
import { Icon, IconProps } from "./Icon";
import { Text, TextProps } from "./Text";
import { Link } from "react-router-dom";

interface ListItemContent {
  titleColor: TextProps["color"];
  isTitleBold: boolean;
  leftIconColor: IconProps["color"];
  leftIconText?: string;
  rightIconColor: IconProps["color"];
  rightIconText?: string;
}

function getListItemContent(
  iconLeft: ListItemProps["iconLeft"],
  iconRight: ListItemProps["iconRight"],
  linkType?: ListItemLinkType
): ListItemContent {
  let titleColor: ListItemContent["titleColor"] = "gray90";
  let isTitleBold = false;
  let leftIconText: ListItemContent["leftIconText"] = iconLeft;
  let leftIconColor: ListItemContent["leftIconColor"] = "gray40";
  let rightIconText: ListItemContent["rightIconText"] = iconRight;
  let rightIconColor: ListItemContent["rightIconColor"] = "gray40";

  if (linkType === "modal") {
    leftIconColor = "blue60";
    titleColor = "blue70";
    isTitleBold = true;
  }

  if (linkType === "external") {
    leftIconColor = "blue60";
    rightIconText = "launch";
    rightIconColor = "blue60";
  }

  if (linkType === "destructive") {
    leftIconColor = "red60";
    rightIconColor = "red60";
    titleColor = "red70";
    isTitleBold = true;
  }

  if (linkType === "push") {
    rightIconText = "chevron_right";
  }

  if (rightIconText === "done" || rightIconText === "done_all") {
    rightIconColor = "green50";
  }

  return {
    titleColor,
    isTitleBold,
    leftIconText,
    leftIconColor,
    rightIconText,
    rightIconColor,
  };
}

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.div<{
  hasLeftComponent?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  showBackground?: boolean;
  linkType?: ListItemLinkType;
  isCompact?: boolean;
}>`
  ${(p) => {
    const gridTemplateValues = [];

    if (p.hasLeftComponent) {
      gridTemplateValues.push("max-content");
    }

    if (p.hasLeftIcon) {
      gridTemplateValues.push("24px");
    }

    gridTemplateValues.push("1fr");

    if (p.hasRightIcon) {
      gridTemplateValues.push("24px");
    }

    return css`
      grid-template-columns: ${gridTemplateValues.join(" ")};
    `;
  }}

  display: grid;
  grid-gap: ${(p) => p.theme.space[2]};
  align-items: center;
  border-radius: ${(p) => p.theme.misc.borderRadius};

  ${(p) => {
    if (!p.isCompact) {
      return css`
        padding: ${p.theme.space[2]} ${p.theme.space[3]};
        margin: 0 -${p.theme.space[3]};
      `;
    }
  }}

  .push {
    transition: transform 150ms ease-in-out, color 150ms ease-in-out;
  }

  ${(p) => {
    if (p.showBackground) {
      const backgroundColor =
        p.linkType === "destructive"
          ? p.theme.colors.red10
          : p.theme.colors.blue10;

      return css`
        cursor: pointer;
        transition: background-color 150ms ease-in-out;

        &:hover {
          background-color: ${backgroundColor};
        }
      `;
    }
  }}

  &:hover {
    .push {
      transform: translateX(2px);
      color: ${(p) => p.theme.colors.blue60};
    }
  }

  ${StyledLink}:active & {
    background-color: ${(p) => p.theme.colors.blue10};
  }
`;

const InnerContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[1]};
`;

type ListItemLinkType = "push" | "modal" | "external" | "destructive";

export interface ListItemProps {
  children?: React.ReactNode;
  additionalContent?: React.ReactNode;
  className?: string;
  iconLeft?: string;
  iconRight?: string;
  renderComponentLeft?: React.ReactNode;
  to?: string;
  linkType?: ListItemLinkType;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  onClick?: () => void;
  isCompact?: boolean;
}

export function ListItem(props: ListItemProps) {
  const {
    titleColor,
    isTitleBold,
    leftIconText,
    leftIconColor,
    rightIconText,
    rightIconColor,
  } = getListItemContent(props.iconLeft, props.iconRight, props.linkType);

  const hasLeftComponent = Boolean(props.renderComponentLeft);
  const hasLeftIcon = Boolean(leftIconText);
  const hasRightIcon = Boolean(rightIconText);

  const showBackground = Boolean(props.linkType || props.onClick);

  const content = (
    <>
      {props.renderComponentLeft ? props.renderComponentLeft : null}
      {hasLeftIcon && <Icon color={leftIconColor}>{leftIconText}</Icon>}
      <InnerContent>
        {props.title ? (
          <div>
            <Text color={titleColor} isBold={isTitleBold}>
              {props.title}
            </Text>
            {props.subtitle ? (
              <Text color="gray70" size={1}>
                {props.subtitle}
              </Text>
            ) : null}
          </div>
        ) : (
          props.children
        )}
        {props.additionalContent}
      </InnerContent>
      {hasRightIcon && (
        <Icon className={props.linkType} color={rightIconColor}>
          {rightIconText}
        </Icon>
      )}
    </>
  );

  if (props.to) {
    return (
      <StyledLink to={props.to} onClick={props.onClick}>
        <Wrapper
          className={props.className}
          hasLeftComponent={hasLeftComponent}
          hasLeftIcon={hasLeftIcon}
          hasRightIcon={hasRightIcon}
          linkType={props.linkType}
          showBackground={showBackground}
          isCompact={props.isCompact}
        >
          {content}
        </Wrapper>
      </StyledLink>
    );
  }
  return (
    <Wrapper
      className={props.className}
      onClick={props.onClick}
      hasLeftComponent={hasLeftComponent}
      hasLeftIcon={hasLeftIcon}
      hasRightIcon={hasRightIcon}
      linkType={props.linkType}
      showBackground={showBackground}
      isCompact={props.isCompact}
    >
      {content}
    </Wrapper>
  );
}
