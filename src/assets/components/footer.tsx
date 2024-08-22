import { styled } from "styled-components";
import { useState, useEffect } from "react";
import React from "react";
const FooterStyled = styled.footer`
  position: fixed;
  bottom: 0;
  height: 10rem;
  background-color: ${(props) => props.theme.colors.primary};
  width: 100vw;
`;
const H1Styled = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.third};
  margin-top: 1rem;
  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;
const H2Styled = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  color: ${(props) => props.theme.colors.third};
  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

export function Footer({ expenses, expenseCalculating, filteredExpenses }) {



  const totalDespesas = expenseCalculating(filteredExpenses );

  return (
    <FooterStyled>
      <H1Styled>Despesa Total</H1Styled>
      <H2Styled>R$ {totalDespesas}</H2Styled>
    </FooterStyled>
  );
}
