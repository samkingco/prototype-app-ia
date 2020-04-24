import React from "react";
import styled from "styled-components";
import { Sidebar } from "./Sidebar";

const Wrapper = styled.div`
  padding-left: 240px;
`;

interface ScreenWithSidebarProps {
  children: React.ReactNode;
}

export function ScreenWithSidebar(props: ScreenWithSidebarProps) {
  return (
    <Wrapper>
      <Sidebar />
      {props.children}
    </Wrapper>
  );
}
