import React from "react";
import styled from "../design-system/styled";

const PageBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-color: ${(p) => p.theme.colors.white};
`;

const Page = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[4]};
  padding: ${(p) => p.theme.space[4]};
  padding-bottom: ${(p) => `calc(${p.theme.space[6]} * 4)`};
`;

interface InterstitialPageProps {
  children: React.ReactNode;
}

export function InterstitialPage(props: InterstitialPageProps) {
  return (
    <>
      <PageBackground />
      <Page>{props.children}</Page>
    </>
  );
}
