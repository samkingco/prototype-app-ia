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
  box-shadow: 0 -1px 0 0 rgba(0, 0, 0, 0.08);
  background: ${(p) => p.theme.colors.white};
  padding: ${(p) => p.theme.space[4]};
  padding-bottom: ${(p) =>
    `calc(env(safe-area-inset-bottom) + ${p.theme.space[4]})`};
`;

interface ToolBarProps {
  children: React.ReactNode;
}

export function ToolBar(props: ToolBarProps) {
  return <Wrapper>{props.children}</Wrapper>;
}
