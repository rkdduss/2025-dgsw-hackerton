import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import styled from "styled-components/native";

export const DismissButton = () => {
  const router = useRouter();
  const handleButton = () => {
    router.back();
  };
  return (
    <Dismiss onPress={handleButton}>
      <Ionicons name="chevron-back" size={24} color="black" />
    </Dismiss>
  );
};

const Dismiss = styled.TouchableOpacity`
  position: absolute;
  left: 0;
`;
