import { useRouter } from "expo-router";
import styled from "styled-components/native";

interface Props {
  title: string;
  detail: string;
  thumbnail?: string;
}

export const CommunityBox = ({ title, detail, thumbnail }: Props) => {
  const router = useRouter();
  const handleCommunityBox = () => {
    router.push("/community-detail");
  };
  return (
    <RowWrap onPress={handleCommunityBox}>
      <TextContainer>
        <Title>{title}</Title>
        <Detail numberOfLines={2}>{detail}</Detail>
      </TextContainer>

      {thumbnail ? (
        <Thumbnail source={{ uri: thumbnail }} />
      ) : (
        <EmptyThumbnail />
      )}
    </RowWrap>
  );
};

const RowWrap = styled.Pressable`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
`;

const TextContainer = styled.View`
  flex: 1;
  padding-right: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: black;
  margin-bottom: 5px;
`;

const Detail = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: #141414;
`;

const Thumbnail = styled.Image`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  background-color: #ccc;
`;

const EmptyThumbnail = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 10px;
  background-color: lightgray;
`;
