import { useState } from 'react';
import { View } from 'react-native';
import * as S from '../../styles/pages/select-certificate';
import { PrimaryButton } from '../../components/button/PrimaryButton';

const certificates = [
  '정보처리기능사',
  '정보처리산업기사',
  '정보처리기사',
  '컴퓨터활용능력1급',
  '컴퓨터활용능력2급',
  '워드프로세서',
  'GTQ',
  'GTQi',
];

export default function SelectCertificatePage() {
  const [selected, setSelected] = useState<string[]>(['정보처리기능사']);

  const toggleSelection = (cert: string) => {
    if (selected.includes(cert)) {
      setSelected(selected.filter((item) => item !== cert));
    } else {
      setSelected([...selected, cert]);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.BackButton>{/* Add back icon */}</S.BackButton>
        <S.HeaderTitle>자격증 선택</S.HeaderTitle>
      </S.Header>

      <S.SearchContainer>
        <S.SearchInput placeholder="검색어를 입력해주세요" />
        <S.SearchIcon source={require('../../../assets/dismiss.png')} />
      </S.SearchContainer>

      <S.CertificateList>
        {certificates.map((cert, index) => (
          <S.CertificateItem
            key={index}
            selected={selected.includes(cert)}
            onPress={() => toggleSelection(cert)}
          >
            <S.CertificateText selected={selected.includes(cert)}>
              {cert}
            </S.CertificateText>
          </S.CertificateItem>
        ))}
      </S.CertificateList>

      <S.ButtonContainer>
        <PrimaryButton
          text={`다음 (${selected.length}개 선택됨)`}
          action={() => {}}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
