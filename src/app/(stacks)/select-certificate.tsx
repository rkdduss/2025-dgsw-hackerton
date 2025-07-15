import { useState } from 'react';
import * as S from '../../styles/pages/select-certificate';
import { PrimaryButton } from '../../components/button/PrimaryButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

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
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(['정보처리기능사']);

  const toggleSelection = (cert: string) => {
    if (selected.includes(cert)) {
      setSelected(selected.filter((item) => item !== cert));
    } else {
      setSelected([...selected, cert]);
    }
  };

  const handleConfirm = () => {
    // write-post로 자격증 배열 전달
    router.back();
    setTimeout(() => {
      router.setParams({ certificates: selected });
    }, 100);
  };

  return (
    <S.Container>
      <SafeAreaView>
        <S.Header>
          <S.BackButton onPress={()=>{
            router.dismiss();
          }}>
            <Entypo name="chevron-thin-left" size={22} color="black" />        
          </S.BackButton>
          <S.HeaderTitle>자격증 선택</S.HeaderTitle>
        </S.Header>

        <S.SearchContainer>
          <S.SearchInput placeholder="검색어를 입력해주세요" />
          <Feather name="search" size={22} color="black" />
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
      </SafeAreaView>
      <S.ButtonContainer>
        <PrimaryButton
          text={`확인 (${selected.length}개 선택됨)`}
          action={handleConfirm}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}
