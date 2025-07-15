import { Text, View } from "react-native";
import * as S from "../../styles/components/input-section";
import { Authinput } from "../textfield/AuthInput";

interface Props {
  title: string;
  placeholder: string;
  isSecton?: boolean;
}

export const InputSection = ({
  title,
  placeholder,
  isSecton = true,
}: Props) => {
  return (
    <S.Container>
      {isSecton ? (
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#7D848A" }}>{title}</Text>
      ) : (
        <View />
      )}
      <Authinput placeholder={placeholder} />
    </S.Container>
  );
};
