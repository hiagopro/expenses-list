import { useState, useEffect } from "react";

import { Header } from "./assets/components/header";
import { DefaulTheme } from "./assets/styles/defaultheme";
import { GlobalStyles } from "./assets/styles/globalstyles";
import { Body } from "./assets/components/body";
import { Footer } from "./assets/components/footer";
import React from "react";
import { LoginPage } from "./assets/components/login";
import axios from "axios";
function App() {
  interface PropsOfExpense {
    expense: string;
    categories: string;
    date: string;
    id: number;
    type: string;
  }
  interface FixedExpense {
    expenseFixed: string;
    categoriesFixed: string;
    dateFixed: string;
    type: string; // Adicionado para corresponder ao tipo de despesa
  }

  interface InstallmentExpense {
    installmentExpense: number;
    installmentNum: number;
    installmentCategories: string;
    installmentData: { month: number; year: number; amount: number }[];
    type: string; // Adicionado para corresponder ao tipo de despesa
  }
  interface FooterProps {
    expense: PropsOfExpense;
    filteredExpenses: PropsOfExpense[];
    expenseCalculating: (expenses: PropsOfExpense[]) => void;
  }

  const [expenses, setExpenses] = useState<PropsOfExpense[]>([]);

  const [expensesFixed, setExpensesFixed] = useState<FixedExpense[]>([]);
  const [installmentExpenses, setInstallmentExpenses] = useState<
    InstallmentExpense[]
  >([]);

  useEffect(() => {
    axios.get("http://localhost:5000/expenses").then((response) => {
      const simpleExpenses = response.data.filter(
        (expense) => expense.type === "simple"
      );
      const fixedExpenses = response.data.filter(
        (expense) => expense.type === "fixed"
      );
      const installmentExpenses = response.data.filter(
        (expense) => expense.type === "installment"
      );

      setExpenses(simpleExpenses);

      setInstallmentExpenses(installmentExpenses);

      console.log(fixedExpenses);
      setExpensesFixed(fixedExpenses);
      console.log(expensesFixed);
    });
  }, []);
  const [filteredMonth, setFilteredMonth] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const handleAddExpense = async (newExpense) => {
    await axios.post("http://localhost:5000/expenses/", {
      expense: newExpense.expense,
      categories: newExpense.categories,
      date: newExpense.date,
      type: newExpense.type,
    });
  };
  const handleAddExpenseFixed = (newExpenseFixed) => {
    axios.post("http://localhost:5000/expenses/", {
      expenseFixed: newExpenseFixed.expenseFixed,
      categoriesFixed: newExpenseFixed.categoriesFixed,
      dateFixed: newExpenseFixed.dateFixed,
      type: newExpenseFixed.type,
    });
    location.reload();
  };
  const handleAddInsttalmentExpense = async (newInstallmentExpenses) => {
    const {
      installmentNum,
      installmentExpense,
      installmentCategories,
      installmentData,
      type,
    } = newInstallmentExpenses;
    console.log({ installmentNum });

    console.log(installmentData.month + "ola");

    await axios.post("http://localhost:5000/expenses/", {
      installmentExpense,
      installmentData: installmentData,
      installmentCategories,
      installmentNum,
      type,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    location.reload();
  };
  const calcularTotalDespesas = (expenses) => {
    let total = 0;
    expenses.forEach((expense) => {
      total += parseFloat(expense.expense);
    });
    let totalFixed = 0;
    expensesFixed.forEach((expenseFixed) => {
      totalFixed += parseFloat(expenseFixed.expenseFixed);
    });

    let totalInstallment = 0;

    if (filteredMonth != null) {
      installmentExpenses.forEach((installmentExpense) => {
        if (
          filteredMonth === installmentExpense.installmentData.month &&
          selectedYear === installmentExpense.installmentData.year
        ) {
          totalInstallment += installmentExpense.installmentData.amount;
        }
      });
    }

    return total + totalFixed + totalInstallment;
  };
  const handleFilteredMonth = () => {
    setFilteredMonth(null);
  };

  const handleFilterMonth = (month) => {
    setFilteredMonth(month); // Atualiza o mês filtrado
  };
  const filterExpensesByMonth = (month) => {
    if (month === null) return expenses;
    return expenses.filter(
      (expense) => new Date(expense.date).getMonth() === month
    );
  };
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value);
    setSelectedYear(year);
  };
  const filterExpensesByYear = (year) => {
    if (year === null) return expenses;
    let monthNow = filterExpensesByMonth(filteredMonth);
    return monthNow.filter(
      (expense) => new Date(expense.date).getFullYear() === selectedYear
    );
  };

  const [signin, setSignin] = useState(true);
  return (
    <div>
      <GlobalStyles />
      {signin == true ? (
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
            handleSelectedYear={selectedYear}
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
      ) : (
        <LoginPage setSignin={setSignin} />
      )}
    </div>
  );
}

export default App;
