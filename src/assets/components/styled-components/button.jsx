import styled from "styled-components";

export const ButtonStyled = styled.button`
    background-color: ${props => props.theme.colors.secondary};
    height: 2.3rem;
    width: 6.8rem;
    border-radius: 8px;
    color: ${props => props.theme.colors.white};
    border:0;
    justify-content: center;
    transition: transform 0.2s ease;
    &:hover {
        transform: scale(1.1);
      }
`
