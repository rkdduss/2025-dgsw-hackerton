import styled from "styled-components/native";


interface Props {
    placeholder: string;
}

export const Authinput = ({placeholder}:Props) => {
    return (
        <Container>
            <InputArea 
            placeholder={placeholder}
            />
        </Container>
    );
  }


const Container = styled.View`
    padding: 0 20px;
    width: 100%;
    height: 55;
    border-radius: 5px;
    background-color: #F3F4F5;
    justify-content: center;
    align-items: center;
    
`
const InputArea = styled.TextInput`
    width: 100%;
    color: #7D848A;
`