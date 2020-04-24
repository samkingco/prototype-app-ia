import { styled } from "./styled";

export const ProgressBar = styled.div<{ progress: number }>`
  position: relative;
  width: 100%;
  height: ${(p) => p.theme.space[1]};
  background: ${(p) => p.theme.colors.gray10};
  border-radius: ${(p) => p.theme.misc.borderRadius};

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(p) => p.progress * 100}%;
    background: ${(p) => p.theme.colors.blue50};
    border-radius: ${(p) => p.theme.misc.borderRadius};
  }
`;
