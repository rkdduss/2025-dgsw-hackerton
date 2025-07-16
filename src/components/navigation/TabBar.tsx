import React from 'react';
import { View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as S from '../../styles/components/navigation/tab-bar';
import { MaterialIcons, FontAwesome6, Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import Feather from '@expo/vector-icons/Feather';

const navItems = [
  { name: '홈', route: 'main', icon: (isFocused: boolean) => <Feather name="home" size={24} color={isFocused ? '#3D5CFF' : '#B0B0B0'} /> },
  { name: '커뮤니티', route: 'community', icon: (isFocused: boolean) => <MaterialIcons name="article" size={24} color={isFocused ? '#3D5CFF' : '#B0B0B0'} /> },
  { name: '채팅', route: 'chat', icon: (isFocused: boolean) => <Ionicons name="chatbubbles" size={24} color={isFocused ? '#3D5CFF' : '#B0B0B0'} /> },
  { name: '내정보', route: 'profile', icon: (isFocused: boolean) => <FontAwesome6 name="user-circle" size={24} color={isFocused ? '#3D5CFF' : '#B0B0B0'} /> },
];

export function TabBar({ state, navigation }: BottomTabBarProps) {
  // main, community | write-post | chat, profile
  return (
    <S.Container>
      {/* 왼쪽 2개 */}
      {navItems.slice(0, 2).map((item, index) => {
        const isFocused = state.index === index;
        return (
          <S.TabButton key={item.name} onPress={() => navigation.navigate(item.route)}>
            <S.TabIcon isFocused={isFocused}>{item.icon(isFocused)}</S.TabIcon>
            <S.TabLabel isFocused={isFocused}>{item.name}</S.TabLabel>
          </S.TabButton>
        );
      })}
      {/* 중앙 글쓰기 */}
      <S.CentralButton onPress={() => navigation.navigate('write-post')}>
        <S.CentralIcon>
          <Entypo name="plus" size={28} color="white" />
        </S.CentralIcon>
      </S.CentralButton>
      <View style={{width:72}}/>
      {navItems.slice(2).map((item, index) => {
        // 중앙버튼(write-post)이 index 2이므로 +2
        const isFocused = state.index === index + 3;
        return (
          <S.TabButton key={item.name} onPress={() => navigation.navigate(item.route)}>
            <S.TabIcon isFocused={isFocused}>{item.icon(isFocused)}</S.TabIcon>
            <S.TabLabel isFocused={isFocused}>{item.name}</S.TabLabel>
          </S.TabButton>
        );
      })}
    </S.Container>
  );
}
