import React from "react";
import styled from "../design-system/styled";

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr ${(p) => `calc(300px - ${p.theme.space[4]})`};
  grid-gap: ${(p) => p.theme.space[4]};
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[4]};
  align-items: flex-start;
`;

const Aside = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[4]};
  align-items: flex-start;

  & > * {
    position: sticky;
    top: ${(p) => `calc(56px + ${p.theme.space[4]})`};
    left: 0;
  }
`;

interface FlowLayoutProps {
  main: React.ReactNode;
  aside: React.ReactNode;
}

export function FlowLayout(props: FlowLayoutProps) {
  return (
    <Wrapper>
      <Main>{props.main}</Main>
      <Aside>{props.aside}</Aside>
    </Wrapper>
  );
}
