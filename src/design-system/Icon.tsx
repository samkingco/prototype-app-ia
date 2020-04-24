import * as React from "react";
import styled, { css } from "./styled";

type IconColor =
  | "inherit"
  | "gray40"
  | "blue60"
  | "green50"
  | "orange50"
  | "red60"
  | "white";

interface StyledIconProps {
  color: IconColor;
  size: number;
}

const StyledIcon = styled("span")<StyledIconProps>`
  font-family: ${(p) => p.theme.fonts.icon};
  font-size: ${(p) => p.theme.fontSizes[p.size]};
  line-height: 1;
  display: inline-block;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  ${(p) =>
    p.color !== "inherit" &&
    css`
      color: ${p.theme.colors[p.color]};
    `};
`;

export interface IconProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ReactType | keyof JSX.IntrinsicElements;
  size?: 3 | 4 | 5 | 6;
  color?: IconColor;
}

export const Icon = ({
  children,
  className,
  as = "span",
  color = "inherit",
  size = 4,
}: IconProps) => {
  return (
    <StyledIcon className={className} as={as} color={color} size={size}>
      {children}
    </StyledIcon>
  );
};
