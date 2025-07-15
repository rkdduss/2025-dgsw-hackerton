import { ScrollView, View } from 'react-native';
import * as S from '../../styles/pages/post-detail';
import { PrimaryButton } from '../../components/button/PrimaryButton';

interface Props {
  type: 'job' | 'worker';
}

export default function PostDetailPage({ type }: Props) {
  const isJob = type === 'job';

  return (
    <View style={{ flex: 1 }}>
      <S.Container>
        <ScrollView>
          <S.Header>
            <S.BackButton>
              {/* Add back icon */}
            </S.BackButton>
            <S.HeaderTitle>{isJob ? '구인' : '구직'}</S.HeaderTitle>
          </S.Header>

          <S.ImageContainer />

          <S.UserInfoContainer>
            <S.Avatar />
            <S.UserTextContainer>
              <S.UserName>{isJob ? '사장남' : '알바님'}</S.UserName>
              <S.UserLocation>
                {isJob ? '명륜진사갈비 대구율하점 • 1km 이내' : '율하역 인근 거주'}
              </S.UserLocation>
            </S.UserTextContainer>
          </S.UserInfoContainer>

          <S.PostContentContainer>
            <S.PostTitle>
              {isJob ? '친절한 알바생 구합니다' : '정보처리산업기사 보유 개발자 입니다.'}
            </S.PostTitle>
            <S.PostInfo>
              {isJob ? '고용 내역: 30명 • 1시간 전' : '경력 3년 • 1시간 전'}
            </S.PostInfo>
            <S.PostDescription>
              {isJob
                ? '고깃집 알바 구합니다! 장사는 잘되지만 사람이 적어서 편하실겁니다 오래보실분 위주로 구하고있습니다.'
                : '정보처리산업기사 보유중입니다. 많은 연락주세요! 그리고 돈안주실거면 연락하지마세요!'}
            </S.PostDescription>
          </S.PostContentContainer>

          <S.Section>
            <S.SectionTitle>{isJob ? '필요 자격' : '보유 자격'}</S.SectionTitle>
            <S.TagContainer>
              <S.Tag active={false}>
                <S.TagText active={false}>정보처리기능사</S.TagText>
              </S.Tag>
              <S.Tag active={true}>
                <S.TagText active={true}>정보처리산업기사</S.TagText>
              </S.Tag>
              <S.Tag active={false}>
                <S.TagText active={false}>정보처리기사</S.TagText>
              </S.Tag>
            </S.TagContainer>
          </S.Section>
        </ScrollView>
      </S.Container>
      <S.BottomBar>
        <S.BottomBarContainer>
          <S.PriceContainer>
            <S.PriceLabel>시급 (오전 9시 ~ 오후 6시)</S.PriceLabel>
            <S.Price>{isJob ? '34,000원' : '12,000원'}</S.Price>
          </S.PriceContainer>
          <PrimaryButton text="채팅 하기" action={() => {}} style="small"/>
        </S.BottomBarContainer>
      </S.BottomBar>
    </View>
  );
}
