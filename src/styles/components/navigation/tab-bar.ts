import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  height: 100px;
  background-color: #ffffff;
  border-top-width: 1px;
  border-top-color: #dddddd;
  justify-content: space-around;
  align-items: flex-start;
  padding-top: 10px;
  
`;

export const TabButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const TabIcon = styled.View<{isFocused: boolean}>`
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
`;

export const TabLabel = styled.Text<{isFocused: boolean}>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ isFocused, theme }) => isFocused ? theme.colors.primary : theme.colors.textgray};
  margin-top: 5px;
`;

export const CentralButton = styled.TouchableOpacity`
    width: 72px;
    height: 72px;
    border-radius: 36px;
    background-color: ${({ theme }) => theme.colors.primary};
    justify-content: center;
    align-items: center;
    position: absolute;
    top:-25px; 
    align-self: center;
    border-width: 4px;
    border-color: #ffffff;
`;

export const CentralIcon = styled.Text`
    color: #ffffff;
    font-size: 32px;
`;
