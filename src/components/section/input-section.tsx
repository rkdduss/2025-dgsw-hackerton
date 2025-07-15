import { Text, View } from "react-native";
import * as S from "../../styles/components/input-section";
import { Authinput } from "../textfield/AuthInput";

interface Props {
  title: string;
  placeholder: string;
  isSecton?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export const InputSection = ({
  title,
  placeholder,
  isSecton = true,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}: Props) => {
  return (
    <S.Container>
      {isSecton ? (
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#7D848A" }}>
          {title}
        </Text>
      ) : (
        <View />
      )}
      <Authinput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </S.Container>
  );
};
