import React from "react";
import styled from "../design-system/styled";

const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 1px solid ${(p) => p.theme.colors.gray10};
  background: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.space[3]};
  padding-bottom: ${(p) =>
    `calc(env(safe-area-inset-bottom) + ${p.theme.space[3]})`};
`;

interface ToolBarProps {
  children: React.ReactNode;
}

export function ToolBar(props: ToolBarProps) {
  return <Wrapper>{props.children}</Wrapper>;
}
