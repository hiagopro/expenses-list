//aqui irei implementar a lista de despezas, com despezas pré-feitas com possibilidade exclui-las
import { useState } from "react";
import React from "react";
import styled from "styled-components";
import { Header } from "./header";
import { XCircle } from "phosphor-react";
import axios from "axios";

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
  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleDeleteExpenseFixed = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      setExpensesFixed(expensesFixed.filter((expense) => expense.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleDeleteInstallmentExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      setInstallmentExpenses(
        installmentExpenses.filter((expense) => expense.id !== id)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <DivScroll>
      <TableStyled>
        <thead>
          <TrStyled>
            <th>Expense</th>
            <th>Categories</th>
            <th>Date</th>
            <th>Actions</th>
          </TrStyled>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <TrStyled key={index}>
              <ThExpense>{expense.expense}</ThExpense>
              <ThExpense>{expense.categories}</ThExpense>
              <ThExpense>{expense.date}</ThExpense>
              <ThExpense>
                <XCircleStyled
                  size={28}
                  onClick={() => handleDeleteExpense(expense.id)}
                />
              </ThExpense>
            </TrStyled>
          ))}
        </tbody>
      </TableStyled>
      <DivTypeExpense>
        <h1>Fixed Expenses</h1>
      </DivTypeExpense>
      <TableStyled>
        <thead>
          <TrStyled>
            <th>Expense</th>
            <th>Categories</th>
            <th>Date</th>
            <th>Actions</th>
          </TrStyled>
        </thead>
        <tbody>
          {Array.isArray(expensesFixed) &&
            expensesFixed.map((expenseFixed, index) => (
              <TrStyled key={index}>
                <ThExpense>{expenseFixed.expense}</ThExpense>
                <ThExpense>{expenseFixed.categories}</ThExpense>
                <ThExpense>{expenseFixed.date}</ThExpense>
                <ThExpense>
                  <XCircleStyled
                    size={28}
                    onClick={() => handleDeleteExpenseFixed(expenseFixed.id)}
                  />
                </ThExpense>
              </TrStyled>
            ))}
        </tbody>
      </TableStyled>
      <DivTypeExpense>
        <h1>Installment Expenses</h1>
      </DivTypeExpense>
      <TableStyled>
        <thead>
          <TrStyled>
            <th>Expense</th>
            <th>Categories</th>
            <th>Installments</th>
            <th>Actions</th>
          </TrStyled>
        </thead>
        <tbody>
          {installmentExpenses.map((installmentExpense, index) => {
            const selectedMonth = filteredMonth;
            const installmentMonth = installmentExpense.installmentData.month;
            const installmentYear = installmentExpense.installmentData.year;
            const selectYear = selectedYear;

            if (
              installmentMonth === selectedMonth &&
              installmentYear === selectYear
            ) {
              return (
                <TrStyled key={`${index}-${installmentExpense.id}`}>
                  <ThExpense>
                    {installmentExpense.installmentData.amount.toFixed(2)}
                  </ThExpense>
                  <ThExpense>
                    {installmentExpense.installmentCategories}
                  </ThExpense>
                  <ThExpense>{installmentExpense.installmentNum}</ThExpense>
                  <ThExpense>
                    <XCircleStyled
                      size={28}
                      onClick={() =>
                        handleDeleteInstallmentExpense(installmentExpense.id)
                      }
                    />
                  </ThExpense>
                </TrStyled>
              );
            } else {
              return null;
            }
          })}
        </tbody>
      </TableStyled>
    </DivScroll>
  );
}
