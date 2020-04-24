import * as React from "react";
import styled, { css } from "./styled";

type FontFamily = "body" | "mono" | "display";

type HeadingColor = "inherit" | "gray90" | "white";

interface StyledHeadingProps {
  color: HeadingColor;
  fontFamily: FontFamily;
  isInline: boolean;
  isBold: boolean;
  size: number;
}

const StyledHeading = styled("h1")<StyledHeadingProps>`
  display: block;
  line-height: 1.4em;
  font-family: ${(p) => p.theme.fonts[p.fontFamily]};
  font-size: ${(p) => p.theme.fontSizes[p.size]};
  display: ${(p) => (p.isInline ? "inline-block" : "block")};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  ${(p) =>
    p.color !== "inherit" &&
    css`
      color: ${p.theme.colors[p.color]};
    `};
`;

export interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ReactType | keyof JSX.IntrinsicElements;
  color?: HeadingColor;
  fontFamily?: FontFamily;
  isInline?: boolean;
  isBold?: boolean;
  size?: 3 | 4 | 5;
}

export const Heading = ({
  children,
  className,
  as = "h1",
  color = "inherit",
  fontFamily = "body",
  isInline = false,
  size = 3,
}: HeadingProps) => {
  return (
    <StyledHeading
      className={className}
      as={as}
      color={color}
      fontFamily={fontFamily}
      isInline={isInline}
      size={size}
    >
      {children}
    </StyledHeading>
  );
};
