//aqui irei implementar a lista de despezas, com despezas pré-feitas com possibilidade exclui-las
import { useState } from "react";
import React from "react";
import styled from "styled-components";
import { Header } from "./header";
import { XCircle } from "phosphor-react";
const TrStyled = styled.tr``;
const TableStyled = styled.table`
  width: 100%;
  background-color: ${(props) => props.theme.colors.third};
`;
const ThExpense = styled.th`
  font-weight: normal;
`;
const XCircleStyled = styled(XCircle)`
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;
const DivTypeExpense = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
`;
const DivScroll = styled.div`
  position: relative;
  overflow-y: auto;
  max-height: calc(100vh - 18rem);
  &::-webkit-scrollbar {
    width: 0.8rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.secondary};
    width: 80%;
    border-radius: 20px;
  }
`;
export function Body({
  expenses,
  setExpenses,
  expensesFixed,
  setExpensesFixed,
  installmentExpenses,
  setInstallmentExpenses,
  filteredMonth,
  selectedYear,
}) {
  const handleDeleteExpense = (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);
    setExpenses(updatedExpenses);
  };
  const handleDeleteExpenseFixed = (index) => {
    const updatedExpensesFixed = [...expensesFixed];
    updatedExpensesFixed.splice(index, 1);
    setExpensesFixed(updatedExpensesFixed);
  };
  const handleDeleteInstallmentExpense = (index) => {
    const updatedInstallmentExpenses = [...installmentExpenses];
    updatedInstallmentExpenses.splice(index, 1);
    setInstallmentExpenses(updatedInstallmentExpenses);
  };
  return (
    <DivScroll>
      <TableStyled>
        <thead>
          <TrStyled>
            <th>Expense</th>
            <th>Categories</th>
            <th>Data</th>
          </TrStyled>
        </thead>

        {expenses.map((expenses, index) => {
          return (
            <thead>
              <TrStyled key={index}>
                <ThExpense>{expenses.expense}</ThExpense>
                <ThExpense>{expenses.categories}</ThExpense>
                <ThExpense>{expenses.data}</ThExpense>
                <XCircleStyled
                  size={28}
                  onClick={() => handleDeleteExpense(index)}
                />
              </TrStyled>
            </thead>
          );
        })}
      </TableStyled>
      <DivTypeExpense>
        <h1>Fixed Expenses</h1>
      </DivTypeExpense>
      <TableStyled>
        <thead>
          <TrStyled>
            <th>Expense</th>
            <th>Categories</th>
            <th>Data</th>
          </TrStyled>
        </thead>
        {expensesFixed.map((expensesFixed, index) => {
          return (
            <thead>
              <TrStyled key={index}>
                <ThExpense>{expensesFixed.expenseFixed}</ThExpense>
                <ThExpense>{expensesFixed.categoriesFixed}</ThExpense>
                <ThExpense>{expensesFixed.dataFixed}</ThExpense>
                <XCircleStyled
                  size={28}
                  onClick={() => handleDeleteExpenseFixed(index)}
                />
              </TrStyled>
            </thead>
          );
        })}
      </TableStyled>
      <DivTypeExpense>
        <h1>Installment Expenses</h1>
      </DivTypeExpense>
      <TableStyled>
        <thead>
          <TrStyled>
            <th>Expense</th>
            <th>Categories</th>
            <th> Qt Parcelas</th>
          </TrStyled>
        </thead>
        {installmentExpenses.map((installmentExpense, index) => {
          return installmentExpense.installmentData.map((installment, i) => {
            const selectedMonth = filteredMonth;
            const installmentMonth = installment.month;
            const installmentYear = installment.year;
            const selectYear = selectedYear;

            if (
              installmentMonth === selectedMonth &&
              installmentYear === selectYear
            ) {
              /// FAÇA ESSA POHA FUNCIONAR

              return (
                <thead>
                  <TrStyled key={`${index}-${i}`}>
                    <ThExpense>{installment.amount}</ThExpense>
                    <ThExpense>
                      {installmentExpense.installmentCategories}
                    </ThExpense>
                    <ThExpense>{installmentExpense.installmentNum}</ThExpense>
                    <XCircleStyled
                      size={28}
                      onClick={() => handleDeleteInstallmentExpense(index)}
                    />
                  </TrStyled>
                </thead>
              );
            } else {
              return null;
            }
          });
        })}
      </TableStyled>
    </DivScroll>
  );
}
