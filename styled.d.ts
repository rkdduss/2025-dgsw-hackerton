import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      textgray: string;
      black: string;
      lightgray: string;
    };
  }
}