import { styled } from "./styled";

export const BulletList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${(p) => p.theme.space[2]};

  li {
    position: relative;
    padding-left: ${(p) => p.theme.space[4]};

    &:before {
      content: " ";
      display: block;
      width: ${(p) => p.theme.space[2]};
      height: ${(p) => p.theme.space[2]};
      margin: ${(p) => p.theme.space[2]} 0;
      border-radius: 50%;
      position: absolute;
      top: 0;
      left: 0;
      background: ${(p) => p.theme.colors.gray20};
    }
  }
`;
