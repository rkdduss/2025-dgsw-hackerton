import { SafeAreaView, ScrollView } from "react-native";
import * as S from "../../styles/pages/community";
import { PrimaryChip } from "@/components/chip/primary_chip";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { CommunityBox } from "@/components/section/community-box";

export default function CommunityPage() {
  const chipList = ["최근 게시물", "인기 게시물", "제보 합니다!", "맛집"];
  const [selectedChip, setSelectedChip] = useState<string>("최근 게시물");

  return (
    <S.Container>
      <SafeAreaView style={{ width: "100%", height: "100%" }}>
        <S.Header>
          <S.HeaderTitle>커뮤니티</S.HeaderTitle>
          <AntDesign name="plus" size={26} color="#5457F7" />
        </S.Header>
        <S.FilterSelectContainer>
          <S.ChipRow horizontal>
            {chipList.map((chip) => (
              <S.ChipWrapper key={chip} onPress={() => setSelectedChip(chip)}>
                <PrimaryChip chipText={chip} active={selectedChip === chip} />
              </S.ChipWrapper>
            ))}
          </S.ChipRow>
        </S.FilterSelectContainer>
        <S.Divider />
        <ScrollView>
          <S.CommunityBoxListArea>
            <CommunityBox
              title="어이가 없습니다 임금 체불 당했습니다."
              detail="저 정보처리기능사 오너인데 돈을 안주네요;; 진짜 정보처리 기능사딴다고 얼마나 고생했는데요 이건 진짜 아니죠"
              thumbnail="/Users/dgsw07/Desktop/React-Native/2025-dgsw-hackerton/assets/thumbnail.png"
            />
            <CommunityBox
              title="어이가 없습니다 임금 체불 당했습니다."
              detail="저 정보처리기능사 오너인데 돈을 안주네요;; 진짜 정보처리 기능사딴다고 얼마나 고생했는데요 이건 진짜 아니죠"
            />
            <CommunityBox
              title="어이가 없습니다 임금 체불 당했습니다."
              detail="저 정보처리기능사 오너인데 돈을 안주네요;; 진짜 정보처리 기능사딴다고 얼마나 고생했는데요 이건 진짜 아니죠"
              thumbnail="/Users/dgsw07/Desktop/React-Native/2025-dgsw-hackerton/assets/thumbnail.png"
            />
            <CommunityBox
              title="어이가 없습니다 임금 체불 당했습니다."
              detail="저 정보처리기능사 오너인데 돈을 안주네요;; 진짜 정보처리 기능사딴다고 얼마나 고생했는데요 이건 진짜 아니죠"
            />
          </S.CommunityBoxListArea>
        </ScrollView>
      </SafeAreaView>
    </S.Container>
  );
}
