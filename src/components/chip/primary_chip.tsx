import styled from "styled-components/native";

interface Props {
  chipText: string;
  active: boolean;
}

export const PrimaryChip = ({ chipText, active }: Props) => {
  return (
    <Container active={active}>
      <Title active={active}>{chipText}</Title>
    </Container>
  );
};
const Container = styled.View<{ active: boolean }>`
  padding: 12px 15px;
  border-radius: 30px;
  background-color: ${({ active }) => (active ? "#5457F7" : "lightgray")};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
`;

const Title = styled.Text<{ active: boolean }>`
  font-size: 14px;
  font-family: 'Pretendard-SemiBold';
  color: ${({ active }) => (active ? "white" : "black")};
`;
