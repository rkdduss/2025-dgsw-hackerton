import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
`;


export const Header = styled.View`
  padding: 20px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 20px;
`;

export const HeaderTitle = styled.Text`
  font-size: 18px;
  font-family: 'Pretendard-SemiBold';
`;

export const Form = styled.ScrollView`
  padding: 20px;
`;

export const ImagePickerContainer = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const ImagePicker = styled.TouchableOpacity`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  background-color: #f9fafb;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

export const ImagePickerText = styled.Text`
  color: #d1d5db;
`;

export const SelectedImage = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 10px;
  margin-right: 10px;
`;

export const InputContainer = styled.View`
  margin-bottom: 20px;
`;

export const InputLabel = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textgray};
  margin-bottom: 10px;
`;

export const TextInput = styled.TextInput`
  background-color: #f3f4f5;
  border-radius: 5px;
  padding: 15px 20px;
  font-size: 14px;
  height: 55px;
`;

export const TextArea = styled.TextInput`
  background-color: #f3f4f5;
  border-radius: 5px;
  padding: 15px 20px;
  font-size: 14px;
  height: 140px;
`;

export const DropdownContainer = styled.TouchableOpacity`
  background-color: #f3f4f5;
  border-radius: 5px;
  padding: 15px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DropdownText = styled.Text`
  font-size: 14px;
  color: black
`;

export const DropdownIcon = styled.View`
  width: 12px;
  height: 6px;
`;

export const TwoButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 10px;
`;

export const ButtonContainer = styled.View`
  padding: 20px;
  width: 100%;
  padding-top: 0px;
  
  bottom: 10px;
`;
