import { useState } from "react";
import { Header } from "./assets/components/header";
import { DefaulTheme } from "./assets/styles/defaultheme";
import { GlobalStyles } from "./assets/styles/globalstyles";
import { Body } from "./assets/components/body";
import { Footer } from "./assets/components/footer";
import React from "react";

function App() {
  interface PropsOfExpense {
    expense: number;
    categories: string;
    data: string;
  }
  interface FooterProps {
    expense: PropsOfExpense;
    filteredExpenses: PropsOfExpense[];
    expenseCalculating: (expenses: PropsOfExpense[]) => void;
  }

  const [expenses, setExpenses] = useState<PropsOfExpense[]>([
    { expense: 700, categories: "Comida", data: "2024-01-04" },
    { expense: 300, categories: "Futebol", data: "2024-03-04" },
  ]);
  const [expensesFixed, setExpensesFixed] = useState([
    {
      expenseFixed: "700",
      categoriesFixed: "Alimento",
      dataFixed: "2024-01-04",
    },
    { expenseFixed: "300", categoriesFixed: "Jogos", dataFixed: "2024-03-04" },
  ]);
  const [installmentExpenses, setInstallmentExpenses] = useState([
    {
      installmentExpense: 200,
      installmentNum: 2,
      installmentCategories: "Jogos",
      installmentData: [
        { month: 1, amount: 100 },
        { month: 2, amount: 100 },
      ],
    },
    {
      installmentExpense: 400,
      installmentNum: 2,
      installmentCategories: "comida",
      installmentData: [
        { year: 2024, month: 0, amount: 200 },
        { year: 2024, month: 1, amount: 200 },
      ],
    },
  ]);
  const [filteredMonth, setFilteredMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState<number>();
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };
  const handleAddExpenseFixed = (newExpenseFixed) => {
    setExpensesFixed([...expensesFixed, newExpenseFixed]);
  };
  const handleAddInsttalmentExpense = (newInstallmentExpense) => {
    setInstallmentExpenses([...installmentExpenses, newInstallmentExpense]);
  };
  const calcularTotalDespesas = (expenses) => {
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.expense;
      console.log(total);
    });
    let totalFixed = 0;
    expensesFixed.forEach((expenseFixed) => {
      totalFixed += parseFloat(expenseFixed.expenseFixed);
      console.log(totalFixed);
    });
    console.log(filteredMonth);
    let totalInstallment = 0;

    if (filteredMonth != null) {
      installmentExpenses.forEach((installmentExpense) => {
        installmentExpense.installmentData.forEach((installment) => {
          if (filteredMonth === installment.month) {
            totalInstallment += installment.amount;
          }
        });
      });
    }

    console.log(totalInstallment);
    return total + totalFixed + totalInstallment;
  };
  const handleFilteredMonth = () => {
    setFilteredMonth(null);
  };

  const handleFilterMonth = (month) => {
    setFilteredMonth(month); // Atualiza o mês filtrado
  };
  const filterExpensesByMonth = (month) => {
    return expenses.filter(
      (expense) => new Date(expense.data).getMonth() === month
    );
  };
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  };
  const filterExpensesByYear = (year) => {
    filterExpensesByMonth(filteredMonth);
    return expenses.filter(
      (expense) => new Date(expense.data).getFullYear() === selectedYear
    );
  };

  return (
    <div>
      <GlobalStyles />
      <DefaulTheme>
        <Header
          onAddExpense={handleAddExpense}
          onFilterMonth={handleFilterMonth}
          onfilteredMonth={handleFilteredMonth}
          onAddExpenseFixed={handleAddExpenseFixed}
          onAddInstallmentExpense={handleAddInsttalmentExpense}
          setInstallmentExpenses={setInstallmentExpenses}
          installmentExpenses={installmentExpenses}
          handleYearChange={handleYearChange}
        />
        <Body
          expenses={
            filteredMonth !== null
              ? filterExpensesByYear(selectedYear)
              : expenses // Filtra as despesas se houver um mês selecionado, caso contrário, mostra todas as despesas
          }
          setExpenses={setExpenses}
          expensesFixed={expensesFixed}
          setExpensesFixed={setExpensesFixed}
          installmentExpenses={installmentExpenses}
          setInstallmentExpenses={setInstallmentExpenses}
          filteredMonth={filteredMonth}
          selectedYear={selectedYear}
        />
        <Footer
          expenses={expenses}
          filteredExpenses={
            filteredMonth !== null
              ? filterExpensesByYear(selectedYear)
              : expenses // Passa as despesas filtradas se houver um mês selecionado, caso contrário, passa todas as despesas
          }
          expenseCalculating={calcularTotalDespesas}
        />
      </DefaulTheme>
    </div>
  );
}

export default App;
