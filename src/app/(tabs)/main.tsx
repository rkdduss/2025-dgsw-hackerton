import { ScrollView } from 'react-native';
import * as S from '../../styles/pages/main';
import { Post } from '../../components/post/post';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Feather from '@expo/vector-icons/Feather';

const categories = [
  { name: '구인', icon: '' },
  { name: '구직', icon: '' },
  { name: '아르바이트', icon: '' },
  { name: '단기 알바', icon: '' },
  { name: '프리랜서', icon: '' },
  { name: '외주', icon: '' },
  { name: '채용', icon: '' },
  { name: '재택알바', icon: '' },
];

const filters = ['공고 중', '내 보유 자격증', '임금 높은 순', '리뷰 많은 순'];

export default function MainPage() {
  const [activeFilter, setActiveFilter] = useState('내 보유 자격증');
  const router = useRouter();

  const handlePostPress = () => {
    router.push('/post-detail');
  };

  return (
    <S.Container>
      
        <S.Header>
          <S.LocationContainer>
            <S.LocationText>구지면</S.LocationText>
            <S.DropdownIcon source={require('../../../assets/dismiss.png')} />
          </S.LocationContainer>
          <S.SearchContainer>
            <S.SearchInput placeholder="검색어를 입력해주세요" />
            <Feather name="search" size={22} color="black" />
          </S.SearchContainer>
        </S.Header>
      <ScrollView>
        <S.CategoryContainer>
          {categories.slice(0, 4).map((category, index) => (
            <S.CategoryItem key={index}>
              <S.CategoryIconContainer />
              <S.CategoryText>{category.name}</S.CategoryText>
            </S.CategoryItem>
          ))}
        </S.CategoryContainer>

        <S.CategoryContainerLast>
          {categories.slice(4).map((category, index) => (
            <S.CategoryItem key={index}>
              <S.CategoryIconContainer />
              <S.CategoryText>{category.name}</S.CategoryText>
            </S.CategoryItem>
          ))}
        </S.CategoryContainerLast>
        <S.Divider />

        <S.FilterContainer horizontal showsHorizontalScrollIndicator={false}>
          {filters.map((filter, index) => (
            <S.FilterButton
              key={index}
              active={filter === activeFilter}
              onPress={() => setActiveFilter(filter)}
            >
              <S.FilterText active={filter === activeFilter}>{filter}</S.FilterText>
            </S.FilterButton>
          ))}
        </S.FilterContainer>

        <S.PostListContainer>
          <Post onPress={handlePostPress} />
          <Post onPress={handlePostPress} />
          <Post onPress={handlePostPress} />
        </S.PostListContainer>
      </ScrollView>
    </S.Container>
  );
}